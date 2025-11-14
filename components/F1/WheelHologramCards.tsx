"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Billboard } from "@react-three/drei";
import * as THREE from "three";

interface WheelHologramCardsProps {
  wheels: {
    wheelLF: THREE.Object3D | null;
    wheelLR: THREE.Object3D | null;
    wheelRR: THREE.Object3D | null;
    wheelRF: THREE.Object3D | null;
  };
  scrollProgress: number;
}

// Her tekerlek için farklı mesajlar
const wheelMessages = {
  wheelLF: {
    title: "ÖN SOL TEKER",
    main: "Hız bir sitenin herşeyidir",
    description:
      "Performans optimizasyonu, kullanıcı deneyiminin temelidir. Her milisaniye önemlidir.",
  },
  wheelLR: {
    title: "ARKA SOL TEKER",
    main: "Stabilite ve güvenilirlik",
    description:
      "Sağlam altyapı, kesintisiz hizmet demektir. Sistemlerin her zaman çalışır durumda olması gerekir.",
  },
  wheelRR: {
    title: "ARKA SAĞ TEKER",
    main: "Ölçeklenebilirlik",
    description:
      "Büyüyen trafiğe uyum sağlayabilmek, modern yazılımın olmazsa olmazıdır.",
  },
  wheelRF: {
    title: "ÖN SAĞ TEKER",
    main: "Kullanıcı odaklı tasarım",
    description:
      "Her detay, kullanıcı deneyimini şekillendirir. Basitlik ve işlevsellik bir arada olmalıdır.",
  },
};

export default function WheelHologramCards({
  wheels,
  scrollProgress,
}: WheelHologramCardsProps) {
  // Tekerler tam çıktı mı? (scrollProgress >= 0.9)
  const wheelsFullyOut = scrollProgress >= 0.9;

  // Global hover state - sadece bir card hover olabilir
  const [hoveredCardKey, setHoveredCardKey] = useState<string | null>(null);

  // Card komponenti
  const WheelCard = ({
    wheel,
    message,
    offset,
    wheelKey,
  }: {
    wheel: THREE.Object3D;
    message: typeof wheelMessages.wheelLF;
    offset: [number, number];
    wheelKey: string;
  }) => {
    const cardRef = useRef<THREE.Group>(null);
    const hoverZoneRef = useRef<THREE.Mesh>(null);
    const positionRef = useRef(new THREE.Vector3());
    const { camera } = useThree();
    const scaleRef = useRef(1);
    const zOffsetRef = useRef(0);

    // Bu card hover mı?
    const isHovered = hoveredCardKey === wheelKey;

    // Pozisyonu sürekli güncelle ve hover animasyonu
    useFrame((state) => {
      if (wheel && cardRef.current) {
        wheel.getWorldPosition(positionRef.current);

        // Hover animasyonu - smooth transition
        const targetScale = isHovered ? 2.4 : 1;
        const targetZOffset = isHovered ? -0.6 : 0;

        scaleRef.current += (targetScale - scaleRef.current) * 0.15;
        zOffsetRef.current += (targetZOffset - zOffsetRef.current) * 0.15;

        // Kameraya doğru yaklaştır
        const cameraPosition = new THREE.Vector3();
        camera.getWorldPosition(cameraPosition);
        const direction = new THREE.Vector3();
        direction.subVectors(cameraPosition, positionRef.current).normalize();

        const baseX = positionRef.current.x + offset[0];
        const baseY =
          positionRef.current.y +
          1.0 +
          Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        const baseZ = positionRef.current.z + offset[1];

        cardRef.current.position.x = baseX + direction.x * zOffsetRef.current;
        cardRef.current.position.y = baseY + direction.y * zOffsetRef.current;
        cardRef.current.position.z = baseZ + direction.z * zOffsetRef.current;

        // Hover zone pozisyonunu güncelle (group'a göre relative)
        if (hoverZoneRef.current) {
          // Hover zone group içinde olduğu için relative pozisyon
          hoverZoneRef.current.position.set(0, 0, 0);
        }

        // Scale uygula
        cardRef.current.scale.set(
          scaleRef.current,
          scaleRef.current,
          scaleRef.current
        );
      }
    });

    // Sadece tekerler tam çıktıysa card'ı göster
    if (!wheelsFullyOut) return null;

    return (
      <group ref={cardRef} renderOrder={isHovered ? 1000 : 0}>
        {/* Invisible hover zone - Billboard içinde, kameraya bakacak şekilde */}
        <Billboard>
          <mesh
            ref={hoverZoneRef}
            onPointerEnter={() => setHoveredCardKey(wheelKey)}
            onPointerLeave={() => setHoveredCardKey(null)}
            position={[0, 0, 0]}
          >
            <planeGeometry args={[1.8, 1.8]} />
            <meshStandardMaterial transparent opacity={0} visible={true} />
          </mesh>
        </Billboard>

        <Billboard>
          <Html
            center
            style={{
              pointerEvents: "none",
              opacity: 1,
              zIndex: isHovered ? 2000 : 1000,
            }}
          >
            <div
              style={{
                width: "120px",
                padding: "8px",
                color: "#ffffff",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                fontSize: "10px",
                lineHeight: "1.3",
                textAlign: "center",
                background: "rgba(0, 0, 0, 0.95)",
                border: "1px solid rgba(96, 165, 250, 0.8)",
                borderRadius: "6px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
                minHeight: "70px",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textRendering: "optimizeLegibility",
                overflow: "hidden",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                transform: `scale(${isHovered ? 2.4 : 1})`,
                transformOrigin: "center center",
                transition: "transform 0.3s ease",
              }}
            >
              <div
                style={{
                  marginBottom: "4px",
                  fontSize: "8px",
                  fontWeight: "600",
                  color: "#60a5fa",
                  letterSpacing: "0.3px",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
                }}
              >
                {message.title}
              </div>
              <div
                style={{
                  marginBottom: "4px",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#ffffff",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {message.main}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  opacity: 0.95,
                  color: "#e5e7eb",
                  lineHeight: "1.3",
                  textShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                }}
              >
                {message.description}
              </div>
            </div>
          </Html>
        </Billboard>
      </group>
    );
  };

  // Card'ları hover durumuna göre ayır
  const allCards = [
    {
      wheel: wheels.wheelLF,
      message: wheelMessages.wheelLF,
      offset: [-0.3, 0.2] as [number, number],
      wheelKey: "wheelLF",
    },
    {
      wheel: wheels.wheelLR,
      message: wheelMessages.wheelLR,
      offset: [-0.3, -0.2] as [number, number],
      wheelKey: "wheelLR",
    },
    {
      wheel: wheels.wheelRR,
      message: wheelMessages.wheelRR,
      offset: [0.3, -0.2] as [number, number],
      wheelKey: "wheelRR",
    },
    {
      wheel: wheels.wheelRF,
      message: wheelMessages.wheelRF,
      offset: [0.3, 0.2] as [number, number],
      wheelKey: "wheelRF",
    },
  ].filter((card) => card.wheel !== null);

  const nonHoveredCards = allCards.filter(
    (card) => card.wheelKey !== hoveredCardKey
  );
  const hoveredCard = allCards.find((card) => card.wheelKey === hoveredCardKey);

  return (
    <>
      {/* Önce hover olmayan card'ları render et */}
      {nonHoveredCards.map((card) => (
        <WheelCard
          key={card.wheelKey}
          wheel={card.wheel!}
          message={card.message}
          offset={card.offset}
          wheelKey={card.wheelKey}
        />
      ))}

      {/* Hover olan card'ı en son render et (üstte görünsün) */}
      {hoveredCard && (
        <WheelCard
          key={hoveredCard.wheelKey}
          wheel={hoveredCard.wheel!}
          message={hoveredCard.message}
          offset={hoveredCard.offset}
          wheelKey={hoveredCard.wheelKey}
        />
      )}
    </>
  );
}
