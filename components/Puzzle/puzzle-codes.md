# Jigsaw Puzzle Parça Kodları

Her parça için 4 kenar var (üst-sağ-alt-sol, saat yönünde).
Her kenar için 3 durum: **0=düz**, **1=çıkıntı**, **2=girinti**

## ⚡ Optimizasyon: Döndürme ile Minimum Gerekli

**81 kod yerine sadece 24 unique parça yeterli!** (%70 azalma)

Parçalar döndürülerek (0°, 90°, 180°, 270°) kullanılabilir, bu sayede aynı PNG dosyası farklı açılarda kullanılır.

### Tüm Kodlar (81 adet)

```
0000  0001  0002  0010  0011  0012  0020  0021  0022
0100  0101  0102  0110  0111  0112  0120  0121  0122
0200  0201  0202  0210  0211  0212  0220  0221  0222
1000  1001  1002  1010  1011  1012  1020  1021  1022
1100  1101  1102  1110  1111  1112  1120  1121  1122
1200  1201  1202  1210  1211  1212  1220  1221  1222
2000  2001  2002  2010  2011  2012  2020  2021  2022
2100  2101  2102  2110  2111  2112  2120  2121  2122
2200  2201  2202  2210  2211  2212  2220  2221  2222
```

## Kategoriler

### Köşe Parçaları (1 adet)

- `0000` - Tüm kenarlar düz (4 köşe parçası aynı tip kullanır)

### Kenar Parçaları (64 adet)

En az bir kenarı 0 (düz) olan parçalar (0000 hariç)

### İç Parçalar (16 adet)

Hiçbir kenarı 0 olmayan parçalar:

```
1111  1112  1121  1122
1211  1212  1221  1222
2111  2112  2121  2122
2211  2212  2221  2222
```

## PNG Dosya İsimleri (Minimum Gerekli - 24 adet)

Sadece representative kodlar için PNG dosyası gerekli:

```
puzzle-piece-0000.png
puzzle-piece-0001.png
puzzle-piece-0002.png
puzzle-piece-0011.png
puzzle-piece-0012.png
puzzle-piece-0021.png
puzzle-piece-0022.png
puzzle-piece-0101.png
puzzle-piece-0102.png
puzzle-piece-0111.png
puzzle-piece-0112.png
puzzle-piece-0121.png
puzzle-piece-0122.png
puzzle-piece-0202.png
puzzle-piece-0211.png
puzzle-piece-0212.png
puzzle-piece-0221.png
puzzle-piece-0222.png
puzzle-piece-1111.png
puzzle-piece-1112.png
puzzle-piece-1122.png
puzzle-piece-1212.png
puzzle-piece-1222.png
puzzle-piece-2222.png
```

**Dosya yolu:** `/puzzle-masks/puzzle-piece-{representative-code}.png`

**Not:** Component otomatik olarak parçaları döndürerek kullanır, bu yüzden sadece 24 unique parça yeterli!

## Tam Liste (81 Kod)

1. puzzle-piece-0000.png
2. puzzle-piece-0001.png
3. puzzle-piece-0002.png
4. puzzle-piece-0010.png
5. puzzle-piece-0011.png
6. puzzle-piece-0012.png
7. puzzle-piece-0020.png
8. puzzle-piece-0021.png
9. puzzle-piece-0022.png
10. puzzle-piece-0100.png
11. puzzle-piece-0101.png
12. puzzle-piece-0102.png
13. puzzle-piece-0110.png
14. puzzle-piece-0111.png
15. puzzle-piece-0112.png
16. puzzle-piece-0120.png
17. puzzle-piece-0121.png
18. puzzle-piece-0122.png
19. puzzle-piece-0200.png
20. puzzle-piece-0201.png
21. puzzle-piece-0202.png
22. puzzle-piece-0210.png
23. puzzle-piece-0211.png
24. puzzle-piece-0212.png
25. puzzle-piece-0220.png
26. puzzle-piece-0221.png
27. puzzle-piece-0222.png
28. puzzle-piece-1000.png
29. puzzle-piece-1001.png
30. puzzle-piece-1002.png
31. puzzle-piece-1010.png
32. puzzle-piece-1011.png
33. puzzle-piece-1012.png
34. puzzle-piece-1020.png
35. puzzle-piece-1021.png
36. puzzle-piece-1022.png
37. puzzle-piece-1100.png
38. puzzle-piece-1101.png
39. puzzle-piece-1102.png
40. puzzle-piece-1110.png
41. puzzle-piece-1111.png
42. puzzle-piece-1112.png
43. puzzle-piece-1120.png
44. puzzle-piece-1121.png
45. puzzle-piece-1122.png
46. puzzle-piece-1200.png
47. puzzle-piece-1201.png
48. puzzle-piece-1202.png
49. puzzle-piece-1210.png
50. puzzle-piece-1211.png
51. puzzle-piece-1212.png
52. puzzle-piece-1220.png
53. puzzle-piece-1221.png
54. puzzle-piece-1222.png
55. puzzle-piece-2000.png
56. puzzle-piece-2001.png
57. puzzle-piece-2002.png
58. puzzle-piece-2010.png
59. puzzle-piece-2011.png
60. puzzle-piece-2012.png
61. puzzle-piece-2020.png
62. puzzle-piece-2021.png
63. puzzle-piece-2022.png
64. puzzle-piece-2100.png
65. puzzle-piece-2101.png
66. puzzle-piece-2102.png
67. puzzle-piece-2110.png
68. puzzle-piece-2111.png
69. puzzle-piece-2112.png
70. puzzle-piece-2120.png
71. puzzle-piece-2121.png
72. puzzle-piece-2122.png
73. puzzle-piece-2200.png
74. puzzle-piece-2201.png
75. puzzle-piece-2202.png
76. puzzle-piece-2210.png
77. puzzle-piece-2211.png
78. puzzle-piece-2212.png
79. puzzle-piece-2220.png
80. puzzle-piece-2221.png
81. puzzle-piece-2222.png

## Notlar

- **Minimum gerekli:** Sadece 24 unique parça (döndürme ile optimize edilmiş)
- **Optimizasyon:** 81 kod → 24 parça (%70 azalma)
- Kod formatı: `{üst}{sağ}{alt}{sol}` (saat yönünde)
- Her kenar: 0=düz, 1=çıkıntı, 2=girinti
- Komşu parçalar otomatik uyumlu olacak şekilde oluşturulur
- Component otomatik olarak parçaları doğru açıda döndürür (CSS transform ile)
