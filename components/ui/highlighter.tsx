"use client";

import { useEffect, useRef } from "react";
import type React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { annotate } from "rough-notation";
import { type RoughAnnotation } from "rough-notation/lib/model";

gsap.registerPlugin(ScrollTrigger);

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const createAnnotation = () => {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      };

      const annotation = annotate(element, annotationConfig);
      annotationRef.current = annotation;
      annotation.show();

      const resizeObserver = new ResizeObserver(() => {
        annotation.hide();
        annotation.show();
      });

      resizeObserver.observe(element);
      resizeObserver.observe(document.body);
      resizeObserverRef.current = resizeObserver;
    };

    if (!isView) {
      // If isView is false, always show immediately
      createAnnotation();
    } else {
      // If isView is true, wait for element to be in view
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: element,
        start: "top bottom-=10%",
        once: true,
        onEnter: () => {
          createAnnotation();
        },
      });
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (annotationRef.current && element) {
        annotationRef.current.remove();
        annotationRef.current = null;
      }
    };
  }, [
    isView,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}
