export const tasksData = [
  // ==================== HTML TASKS ====================
  {
    id: 'html-1',
    category: 'html',
    title: 'Rasm joylashtirish',
    difficulty: 'Beginner',
    fileName: 'index.html',
    description: `Sahifaga rasm joylashtiring. Buning uchun <img> tegidan foydalaning.
Talablar:
1. Rasmning manzili (src atributi) "https://picsum.photos/200" bo'lishi kerak.
2. Rasmning alt atributiga "Tasodifiy rasm" deb yozilishi shart.`,
    initialCode: `<!-- Rasm tegini shu yerga yozing -->
`,
    tests: [
      {
        id: 'img-exists',
        description: "<img> tegi sahifada mavjud bo'lishi kerak",
        check: (doc, win) => !!doc.querySelector('img')
      },
      {
        id: 'img-src',
        description: "Rasmning 'src' manzili 'https://picsum.photos/200' bo'lishi kerak",
        check: (doc, win) => {
          const img = doc.querySelector('img');
          if (!img) return false;
          const src = img.getAttribute('src') || '';
          return src.trim() === 'https://picsum.photos/200';
        }
      },
      {
        id: 'img-alt',
        description: "Rasmning 'alt' matni 'Tasodifiy rasm' bo'lishi kerak",
        check: (doc, win) => {
          const img = doc.querySelector('img');
          if (!img) return false;
          const alt = img.getAttribute('alt') || '';
          return alt.trim() === 'Tasodifiy rasm';
        }
      }
    ]
  },
  {
    id: 'html-2',
    category: 'html',
    title: 'Havola va uning ochilishi',
    difficulty: 'Beginner',
    fileName: 'index.html',
    description: `LuminaEdu platformasiga yo'naltiruvchi havola yarating.
Talablar:
1. Havola (<a> tegi) manzili (href) "https://lumina.edu" bo'lishi kerak.
2. Havola yangi tabda ochilishi kerak (target="_blank" atributi yordamida).
3. Havola matni "LuminaEdu" bo'lsin.`,
    initialCode: `<!-- Havolani shu yerga yozing -->
`,
    tests: [
      {
        id: 'link-exists',
        description: "<a> tegi sahifada mavjud bo'lishi kerak",
        check: (doc, win) => !!doc.querySelector('a')
      },
      {
        id: 'link-href',
        description: "Havola manzili 'https://lumina.edu' bo'lishi kerak",
        check: (doc, win) => {
          const a = doc.querySelector('a');
          return a && (a.getAttribute('href') || '').trim() === 'https://lumina.edu';
        }
      },
      {
        id: 'link-target',
        description: "Havola target='_blank' atributiga ega bo'lishi kerak",
        check: (doc, win) => doc.querySelector('a')?.getAttribute('target') === '_blank'
      },
      {
        id: 'link-text',
        description: "Havola matni 'LuminaEdu' bo'lishi kerak",
        check: (doc, win) => (doc.querySelector('a')?.textContent || '').trim() === 'LuminaEdu'
      }
    ]
  },
  {
    id: 'html-3',
    category: 'html',
    title: "Tartibsiz ro'yxat yaratish",
    difficulty: 'Intermediate',
    fileName: 'index.html',
    description: `Dasturlash tillari ro'yxatini shakllantiring.
Talablar:
1. Tartibsiz ro'yxat (<ul> tegi) yarating.
2. Ro'yxat ichida 3 ta element (<li> tegi) bo'lsin.
3. Elementlar matni tartib bilan "HTML", "CSS", "JavaScript" bo'lishi kerak.`,
    initialCode: `<!-- Ro'yxatni shu yerga yozing -->
`,
    tests: [
      {
        id: 'ul-exists',
        description: "<ul> tegi yaratilgan bo'lishi kerak",
        check: (doc, win) => !!doc.querySelector('ul')
      },
      {
        id: 'li-count',
        description: "Ro'yxat ichida roppa-rosa 3 ta <li> elementi bo'lishi kerak",
        check: (doc, win) => doc.querySelectorAll('ul li').length === 3
      },
      {
        id: 'li-content',
        description: "Ro'yxat elementlari mos ravishda 'HTML', 'CSS', 'JavaScript' bo'lishi kerak",
        check: (doc, win) => {
          const items = Array.from(doc.querySelectorAll('ul li')).map(el => el.textContent.trim());
          return items[0] === 'HTML' && items[1] === 'CSS' && items[2] === 'JavaScript';
        }
      }
    ]
  },
  {
    id: 'html-4',
    category: 'html',
    title: "Ma'lumotlar jadvali",
    difficulty: 'Intermediate',
    fileName: 'index.html',
    description: `O'quvchi ballari yozilgan sodda jadval yarating.
Talablar:
1. <table> tegi bo'lishi kerak.
2. Birinchi qator (<tr>) sarlavhalar uchun bo'lib, unda <th> teglari bilan "Ism" va "Ball" bo'lishi kerak.
3. Ikkinchi qator (<tr>) ma'lumot uchun bo'lib, unda <td> teglari bilan "Alisher" va "95" bo'lishi kerak.`,
    initialCode: `<!-- Jadvalni shu yerga yozing -->
`,
    tests: [
      {
        id: 'table-exists',
        description: "Jadval <table> tegi bilan ochilgan bo'lishi kerak",
        check: (doc, win) => !!doc.querySelector('table')
      },
      {
        id: 'table-headers',
        description: "Jadvalda 'Ism' va 'Ball' sarlavhalari (<th>) bo'lishi kerak",
        check: (doc, win) => {
          const headers = Array.from(doc.querySelectorAll('table th')).map(el => el.textContent.trim());
          return headers.includes('Ism') && headers.includes('Ball');
        }
      },
      {
        id: 'table-data',
        description: "Jadvalda 'Alisher' va '95' qiymatli kataklar (<td>) bo'lishi kerak",
        check: (doc, win) => {
          const cells = Array.from(doc.querySelectorAll('table td')).map(el => el.textContent.trim());
          return cells.includes('Alisher') && cells.includes('95');
        }
      }
    ]
  },
  {
    id: 'html-5',
    category: 'html',
    title: 'Kiritish formasi',
    difficulty: 'Junior',
    fileName: 'index.html',
    description: `Foydalanuvchidan ismini so'raydigan forma yarating.
Talablar:
1. <form> tegi ichida input bo'lishi kerak.
2. Input tegi matnli kiritish (type="text") bo'lishi kerak.
3. Inputning placeholder atributida "Ismingizni kiriting" deb yozilgan bo'lishi kerak.
4. Formaning ostida "Yuborish" yozuvli yuborish tugmasi (<button type="submit">) bo'lishi kerak.`,
    initialCode: `<form>
  <!-- Kodingizni shu yerga yozing -->
</form>
`,
    tests: [
      {
        id: 'form-input',
        description: "Forma ichida matnli input (type='text') bo'lishi kerak",
        check: (doc, win) => {
          const input = doc.querySelector('form input');
          return input && (input.getAttribute('type') === 'text' || !input.getAttribute('type'));
        }
      },
      {
        id: 'form-placeholder',
        description: "Inputda placeholder='Ismingizni kiriting' bo'lishi kerak",
        check: (doc, win) => {
          const input = doc.querySelector('form input');
          return input && (input.getAttribute('placeholder') || '').trim() === 'Ismingizni kiriting';
        }
      },
      {
        id: 'form-button',
        description: "Forma ichida 'Yuborish' deb yozilgan submit tugmasi bo'lishi kerak",
        check: (doc, win) => {
          const btn = doc.querySelector('form button');
          return btn && btn.getAttribute('type') === 'submit' && btn.textContent.trim() === 'Yuborish';
        }
      }
    ]
  },

  // ==================== CSS TASKS ====================
  {
    id: 'css-1',
    category: 'css',
    title: 'Div rangini o\'zgartirish',
    difficulty: 'Beginner',
    fileName: 'style.css',
    description: `Kvadrat rangini o'zgartiring.
Talablar:
1. '.square' klassiga ega elementning fon rangini (background-color) 'royalblue' qiling.`,
    initialCode: `<div class="square"></div>

<style>
.square {
  width: 100px;
  height: 100px;
  background-color: red; /* Shu rangni royalblue ga o'zgartiring */
}
</style>
`,
    tests: [
      {
        id: 'square-royalblue',
        description: "Fon rangi 'royalblue' bo'lishi kerak",
        // win = iframe's window, so getComputedStyle reads correct iframe styles
        check: (doc, win) => {
          const el = doc.querySelector('.square');
          if (!el) return false;
          const bg = win.getComputedStyle(el).backgroundColor;
          // royalblue = rgb(65, 105, 225)
          return bg === 'rgb(65, 105, 225)';
        }
      }
    ]
  },
  {
    id: 'css-2',
    category: 'css',
    title: 'Dumaloq shakl yasash',
    difficulty: 'Beginner',
    fileName: 'style.css',
    description: `Kvadrat shaklidagi elementni aylanaga aylantiring va hoshiya bering.
Talablar:
1. '.box' klassli elementga aylana shaklini verish uchun 'border-radius' qiymatini '50%' qiling.
2. Element atrofiga 5px qalinlikdagi oq rangli ('white') tekis hoshiya ('border') bering.`,
    initialCode: `<div class="box"></div>

<style>
.box {
  width: 120px;
  height: 120px;
  background-color: #3b82f6;
  /* Kodingizni shu yerga yozing */
}
</style>
`,
    tests: [
      {
        id: 'box-radius',
        description: "border-radius 50% bo'lishi kerak",
        check: (doc, win) => {
          const el = doc.querySelector('.box');
          if (!el) return false;
          const radius = win.getComputedStyle(el).borderRadius;
          // 50% of 120px = 60px; browsers may return either form
          return radius.includes('50%') || radius === '60px' || radius.includes('60px');
        }
      },
      {
        id: 'box-border',
        description: "Hoshiya 5px qalinlikda va oq rangda bo'lishi kerak",
        check: (doc, win) => {
          const el = doc.querySelector('.box');
          if (!el) return false;
          const style = win.getComputedStyle(el);
          const bWidth = style.borderTopWidth; // more reliable than borderWidth
          const bColor = style.borderTopColor;
          const bStyle = style.borderTopStyle;
          return bWidth === '5px' && bColor === 'rgb(255, 255, 255)' && bStyle === 'solid';
        }
      }
    ]
  },
  {
    id: 'css-3',
    category: 'css',
    title: 'Flexbox orqali markazga keltirish',
    difficulty: 'Intermediate',
    fileName: 'style.css',
    description: `Elementni flexbox orqali konteynerning o'rtasiga joylashtiring.
Talablar:
1. '.container' klassli elementni 'display: flex' qiling.
2. Ichidagi element gorizontal ravishda ham, vertikal ravishda ham markazda joylashsin. Buning uchun 'justify-content: center' va 'align-items: center' xossalarini qo'shing.`,
    initialCode: `<div class="container">
  <div class="item">Markaz</div>
</div>

<style>
.container {
  width: 100%;
  height: 150px;
  background-color: #1e1e38;
  /* Flexbox xossalarini shu yerga yozing */
}
.item {
  width: 80px;
  height: 50px;
  background-color: #a855f7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
</style>
`,
    tests: [
      {
        id: 'flex-display',
        description: "Konteyner display xossasi flex bo'lishi kerak",
        check: (doc, win) => {
          const el = doc.querySelector('.container');
          return el && win.getComputedStyle(el).display === 'flex';
        }
      },
      {
        id: 'flex-center',
        description: "Element markazlashtirilgan bo'lishi kerak (justify-content: center va align-items: center)",
        check: (doc, win) => {
          const el = doc.querySelector('.container');
          if (!el) return false;
          const style = win.getComputedStyle(el);
          return style.justifyContent === 'center' && style.alignItems === 'center';
        }
      }
    ]
  },
  {
    id: 'css-4',
    category: 'css',
    title: 'Gradient va Soya berish',
    difficulty: 'Intermediate',
    fileName: 'style.css',
    description: `Karta elementini zamonaviy dizaynga keltiring.
Talablar:
1. '.card' klassiga ega element foni uchun gradient rang bering (background-image: linear-gradient). Binafsha rangdan (#8b5cf6) to'q ko'k ranggacha (#3b82f6) bo'lgan chapdan-o'ngga (to right) gradient bering.
2. Kartaga soya bering: 'box-shadow' qiymati '0 10px 20px rgba(139, 92, 246, 0.4)' bo'lsin.`,
    initialCode: `<div class="card">Lumina</div>

<style>
.card {
  width: 200px;
  height: 100px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Kodingizni shu yerga yozing */
}
</style>
`,
    tests: [
      {
        id: 'card-gradient',
        description: "Linear gradient foni o'rnatilgan bo'lishi kerak",
        check: (doc, win) => {
          const el = doc.querySelector('.card');
          if (!el) return false;
          const bg = win.getComputedStyle(el).backgroundImage;
          return bg.includes('linear-gradient') &&
            (bg.includes('rgb(139, 92, 246)') || bg.includes('139, 92, 246')) &&
            (bg.includes('rgb(59, 130, 246)') || bg.includes('59, 130, 246'));
        }
      },
      {
        id: 'card-shadow',
        description: "Kartada box-shadow soyasi bo'lishi kerak",
        check: (doc, win) => {
          const el = doc.querySelector('.card');
          if (!el) return false;
          const shadow = win.getComputedStyle(el).boxShadow;
          return shadow && shadow !== 'none';
        }
      }
    ]
  },
  {
    id: 'css-5',
    category: 'css',
    title: 'CSS Grid Sistemasi',
    difficulty: 'Junior',
    fileName: 'style.css',
    description: `CSS Grid yordamida elementlarni 3 ta teng ustunga joylashtiring.
Talablar:
1. '.grid-container' klassli elementga 'display: grid' bering.
2. Har bir ustun kengligi teng bo'lgan 3 ta ustun hosil qiling ('grid-template-columns: repeat(3, 1fr)').
3. Ustunlar orasidagi bo'shliqni ('gap' xossasi) '16px' qilib belgilang.`,
    initialCode: `<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
</div>

<style>
.grid-container {
  /* Grid xossalarini shu yerga yozing */
}
.grid-item {
  background-color: #06b6d4;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}
</style>
`,
    tests: [
      {
        id: 'grid-display',
        description: "Konteyner display xossasi grid bo'lishi kerak",
        check: (doc, win) => {
          const el = doc.querySelector('.grid-container');
          return el && win.getComputedStyle(el).display === 'grid';
        }
      },
      {
        id: 'grid-cols',
        description: "3 ta ustunli grid tuzilgan bo'lishi kerak",
        check: (doc, win) => {
          const el = doc.querySelector('.grid-container');
          if (!el) return false;
          const cols = win.getComputedStyle(el).gridTemplateColumns;
          // 3 columns = 3 values separated by spaces
          return cols && cols.trim().split(/\s+/).length === 3;
        }
      },
      {
        id: 'grid-gap',
        description: "Ustunlar orasi bo'shlig'i (gap) 16px bo'lishi shart",
        check: (doc, win) => {
          const el = doc.querySelector('.grid-container');
          if (!el) return false;
          const style = win.getComputedStyle(el);
          // 'gap' may be reported as rowGap + columnGap in older browsers
          return style.gap === '16px' || style.rowGap === '16px' || style.columnGap === '16px';
        }
      }
    ]
  },

  // ==================== JAVASCRIPT TASKS ====================
  {
    id: 'js-1',
    category: 'javascript',
    title: 'Ikki son yig\'indisi',
    difficulty: 'Beginner',
    fileName: 'script.js',
    description: `Ikkita sonning yig'indisini hisoblaydigan funksiya yozing.
Talablar:
1. 'sum' nomli funksiya yarating, u 'a' va 'b' parametrlarini qabul qilsin.
2. Funksiya parametrlar yig'indisini return orqali qaytarishi kerak.`,
    initialCode: `function sum(a, b) {
  // Kodingizni shu yerga yozing
  
}
`,
    tests: [
      {
        id: 'sum-exists',
        description: "sum nomli funksiya mavjud bo'lishi kerak",
        check: (doc, win) => typeof win.sum === 'function'
      },
      {
        id: 'sum-positive',
        description: "sum(5, 7) chaqirilganda 12 javobini qaytarishi kerak",
        check: (doc, win) => win.sum?.(5, 7) === 12
      },
      {
        id: 'sum-negative',
        description: "sum(-3, 10) chaqirilganda 7 javobini qaytarishi kerak",
        check: (doc, win) => win.sum?.(-3, 10) === 7
      }
    ]
  },
  {
    id: 'js-2',
    category: 'javascript',
    title: 'Eng katta sonni topish',
    difficulty: 'Beginner',
    fileName: 'script.js',
    description: `Berilgan sonlar massividan eng katta sonni qaytaruvchi funksiya yozing.
Talablar:
1. 'findMax' nomli funksiya tuzing. U bitta parametr - sonlar massivini (arr) qabul qilsin.
2. Funksiya massivdagi eng katta qiymatni qaytarsin.`,
    initialCode: `function findMax(arr) {
  // Kodingizni shu yerga yozing
  
}
`,
    tests: [
      {
        id: 'max-exists',
        description: "findMax funksiyasi mavjud bo'lishi kerak",
        check: (doc, win) => typeof win.findMax === 'function'
      },
      {
        id: 'max-calc-1',
        description: "findMax([1, 5, 3, 9, 2]) chaqirilganda 9 qiymatini qaytarishi kerak",
        check: (doc, win) => win.findMax?.([1, 5, 3, 9, 2]) === 9
      },
      {
        id: 'max-calc-2',
        description: "findMax([-10, -5, -30]) chaqirilganda -5 qiymatini qaytarishi kerak",
        check: (doc, win) => win.findMax?.([-10, -5, -30]) === -5
      }
    ]
  },
  {
    id: 'js-3',
    category: 'javascript',
    title: 'Faktorial hisoblash',
    difficulty: 'Intermediate',
    fileName: 'script.js',
    description: `Berilgan butun n sonining faktorialini (n!) hisoblaydigan rekursiv yoki oddiy funksiya yozing.
Talablar:
1. 'factorial' nomli funksiya tuzing, u bitta parametr 'n' sonini qabul qiladi.
2. n=0 bo'lsa 1 qaytarishi, n=5 bo'lsa 120 qaytarishi kerak.`,
    initialCode: `function factorial(n) {
  // Kodingizni shu yerga yozing
  
}
`,
    tests: [
      {
        id: 'fact-exists',
        description: "factorial funksiyasi mavjud bo'lishi kerak",
        check: (doc, win) => typeof win.factorial === 'function'
      },
      {
        id: 'fact-zero',
        description: "factorial(0) natijasi 1 bo'lishi kerak",
        check: (doc, win) => win.factorial?.(0) === 1
      },
      {
        id: 'fact-five',
        description: "factorial(5) natijasi 120 bo'lishi kerak",
        check: (doc, win) => win.factorial?.(5) === 120
      }
    ]
  },
  {
    id: 'js-4',
    category: 'javascript',
    title: 'Massivdagi juft sonlarni filtrlash',
    difficulty: 'Intermediate',
    fileName: 'script.js',
    description: `Berilgan sonlar massividan faqat juft sonlarni sarlab yangi massiv sifatida qaytaruvchi funksiya yozing.
Talablar:
1. 'filterEven' nomli funksiya yarating, u parametr sifatida 'arr' massivini qabul qilsin.
2. Funksiya faqat juft sonlardan tashkil topgan yangi massivni return qilsin.`,
    initialCode: `function filterEven(arr) {
  // Kodingizni shu yerga yozing
  
}
`,
    tests: [
      {
        id: 'even-exists',
        description: "filterEven funksiyasi mavjud bo'lishi kerak",
        check: (doc, win) => typeof win.filterEven === 'function'
      },
      {
        id: 'even-calc-1',
        description: "filterEven([1, 2, 3, 4, 5, 6]) natijasi [2, 4, 6] bo'lishi kerak",
        check: (doc, win) => {
          const res = win.filterEven?.([1, 2, 3, 4, 5, 6]);
          return Array.isArray(res) && res.length === 3 && res[0] === 2 && res[1] === 4 && res[2] === 6;
        }
      },
      {
        id: 'even-calc-2',
        description: "Juft sonlar bo'lmaganda bo'sh massiv [] qaytishi kerak",
        check: (doc, win) => {
          const res = win.filterEven?.([1, 3, 5]);
          return Array.isArray(res) && res.length === 0;
        }
      }
    ]
  },
  {
    id: 'js-5',
    category: 'javascript',
    title: 'Palindrom tekshirish',
    difficulty: 'Junior',
    fileName: 'script.js',
    description: `Berilgan so'zning palindrom (o'ngdan ham, chapdan ham o'qiganda bir xil) ekanligini aniqlovchi funksiya yozing.
Talablar:
1. 'isPalindrome' nomli funksiya tuzing, u matnli 'str' parametrini qabul qiladi.
2. Katta-kichik harflarni inobatga olmasligi kerak (masalan, 'Radar' ham palindrom bo'lsin).
3. Palindrom bo'lsa true, aks holda false qaytarsin.`,
    initialCode: `function isPalindrome(str) {
  // Kodingizni shu yerga yozing
  
}
`,
    tests: [
      {
        id: 'pal-exists',
        description: "isPalindrome funksiyasi mavjud bo'lishi kerak",
        check: (doc, win) => typeof win.isPalindrome === 'function'
      },
      {
        id: 'pal-true-1',
        description: "isPalindrome('radar') true qiymat qaytarishi kerak",
        check: (doc, win) => win.isPalindrome?.('radar') === true
      },
      {
        id: 'pal-true-2',
        description: "isPalindrome('Kiyik') true qiymat qaytarishi kerak (harf registrlarisiz)",
        check: (doc, win) => win.isPalindrome?.('Kiyik') === true
      },
      {
        id: 'pal-false',
        description: "isPalindrome('hello') false qiymat qaytarishi kerak",
        check: (doc, win) => win.isPalindrome?.('hello') === false
      }
    ]
  },

  // ==================== REACT TASKS ====================
  {
    id: 'react-1',
    category: 'react',
    title: 'Counter (Hisoblagich) yaratish',
    difficulty: 'Beginner',
    fileName: 'App.jsx',
    description: `Tugma bosilganda o'z hisobini oshirib boradigan Counter komponentini yozing.
Talablar:
1. React'ning 'useState' xossasidan foydalaning va boshlang'ich qiymatni 0 qiling.
2. Komponent '<button>' elementi qaytarsin.
3. Tugma bosilganda (onClick) uning ichidagi son 1 taga oshishi kerak.
4. Tugmaning matni faqatgina joriy son bo'lishi kerak (masalan: 0, 1, 2...).`,
    initialCode: `import React, { useState } from 'react';

export default function Counter() {
  // Kodingizni shu yerga yozing
  
  return (
    <button>0</button>
  );
}
`,
    tests: [
      {
        id: 'counter-btn-exists',
        description: "Ekranda button tegi ko'rinishi kerak",
        check: (doc, win) => !!doc.querySelector('button')
      },
      {
        id: 'counter-initial',
        description: "Tugmaning boshlang'ich matni '0' bo'lishi kerak",
        check: (doc, win) => (doc.querySelector('button')?.textContent || '').trim() === '0'
      },
      {
        id: 'counter-increment',
        description: "Tugma 1 marta bosilganda qiymat '1' bo'lishi kerak",
        check: async (doc, win) => {
          const btn = doc.querySelector('button');
          if (!btn) return false;
          btn.click();
          await new Promise(r => setTimeout(r, 200));
          return (btn.textContent || '').trim() === '1';
        }
      }
    ]
  },
  {
    id: 'react-2',
    category: 'react',
    title: 'Input ma\'lumotini real vaqtda chiqarish',
    difficulty: 'Beginner',
    fileName: 'App.jsx',
    description: `Kiritish maydonidagi matnni real vaqtda ekranda ko'rsating.
Talablar:
1. 'TextPreview' deb nomlangan komponent bo'lsin.
2. Ichida bitta '<input type="text">' va bitta '<h1>' tegi bo'lishi kerak.
3. Inputga nimadir yozilganda, uning qiymati '<h1>' tegi ichida aks etsin.`,
    initialCode: `import React, { useState } from 'react';

export default function TextPreview() {
  // Kodingizni shu yerga yozing
  
  return (
    <div>
      <input type="text" placeholder="Matn kiriting..." />
      <h1></h1>
    </div>
  );
}
`,
    tests: [
      {
        id: 'input-exists',
        description: "Matn kiritish input tegi bo'lishi kerak",
        check: (doc, win) => !!doc.querySelector('input')
      },
      {
        id: 'h1-exists',
        description: "<h1> tegi bo'lishi kerak",
        check: (doc, win) => !!doc.querySelector('h1')
      },
      {
        id: 'input-sync',
        description: "Inputga 'Salom' yozilganda h1 ichida 'Salom' ko'rinishi kerak",
        check: async (doc, win) => {
          const input = doc.querySelector('input');
          const h1 = doc.querySelector('h1');
          if (!input || !h1) return false;
          
          // Simulate user typing by setting value and firing React's synthetic events
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value')?.set;
          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(input, 'Salom');
          } else {
            input.value = 'Salom';
          }
          input.dispatchEvent(new win.Event('input', { bubbles: true }));
          input.dispatchEvent(new win.Event('change', { bubbles: true }));
          
          await new Promise(r => setTimeout(r, 200));
          return (h1.textContent || '').trim() === 'Salom';
        }
      }
    ]
  },
  {
    id: 'react-3',
    category: 'react',
    title: 'Elementni yashirish va ko\'rsatish',
    difficulty: 'Intermediate',
    fileName: 'App.jsx',
    description: `Tugma orqali maxsus blokni ekrandan yashiring yoki ko'rsating.
Talablar:
1. 'ToggleBox' nomli komponent yarating. Unda bitta '<button>' va klassi 'box' bo'lgan '<div>' bo'lishi shart.
2. Boshlang'ich holatda '.box' divi ekranda ko'rinib tursin.
3. Tugma matni boshida "Yashirish" bo'lib, div ko'rinmas bo'lganda "Ko'rsatish"ga o'zgarsin.
4. Tugma bosilganda '.box' divi ekrandan o'chirilishi (yoki yashirilishi) kerak.`,
    initialCode: `import React, { useState } from 'react';

export default function ToggleBox() {
  // Kodingizni shu yerga yozing
  
  return (
    <div>
      <button>Yashirish</button>
      <div className="box" style={{ width: 100, height: 100, backgroundColor: 'purple', marginTop: 10 }}></div>
    </div>
  );
}
`,
    tests: [
      {
        id: 'toggle-elements',
        description: "button va .box klassli elementlar dastlab ekranda bo'lishi kerak",
        check: (doc, win) => !!doc.querySelector('button') && !!doc.querySelector('.box')
      },
      {
        id: 'toggle-hide',
        description: "Tugma bosilgandan so'ng .box klassli element yashirilishi kerak",
        check: async (doc, win) => {
          const btn = doc.querySelector('button');
          if (!btn) return false;
          btn.click();
          await new Promise(r => setTimeout(r, 200));
          const box = doc.querySelector('.box');
          if (!box) return true; // box removed from DOM entirely = also valid
          const display = win.getComputedStyle(box).display;
          const visibility = win.getComputedStyle(box).visibility;
          return display === 'none' || visibility === 'hidden';
        }
      },
      {
        id: 'toggle-button-text',
        description: "Div yashirilganda tugma matni 'Ko'rsatish' bo'lishi kerak",
        check: (doc, win) => {
          const btn = doc.querySelector('button');
          return btn && (btn.textContent || '').trim() === "Ko'rsatish";
        }
      }
    ]
  },
  {
    id: 'react-4',
    category: 'react',
    title: 'Dinamik Ro\'yxatga element qo\'shish',
    difficulty: 'Intermediate',
    fileName: 'App.jsx',
    description: `Foydalanuvchi yozgan rejani ro'yxatga qo'shish komponentini yarating.
Talablar:
1. 'TodoList' nomli komponent bo'lsin.
2. Uning ichida bitta '<input type="text">', bitta '<button>Qo'shish</button>' va '<ul>' tegi bo'lishi lozim.
3. Tugma bosilganda inputdagi matn yangi '<li>' elementi sifatida ul ichiga qo'shilishi va input bo'shatilishi kerak.`,
    initialCode: `import React, { useState } from 'react';

export default function TodoList() {
  // Kodingizni shu yerga yozing
  
  return (
    <div>
      <input type="text" />
      <button>Qo'shish</button>
      <ul>
      </ul>
    </div>
  );
}
`,
    tests: [
      {
        id: 'todo-structure',
        description: "TodoList ichida input, button va ul teglari bo'lishi kerak",
        check: (doc, win) => !!doc.querySelector('input') && !!doc.querySelector('button') && !!doc.querySelector('ul')
      },
      {
        id: 'todo-add-item',
        description: "Matn kiritib 'Qo'shish' tugmasi bosilganda ul ichida li elementi yaratilishi kerak",
        check: async (doc, win) => {
          const input = doc.querySelector('input');
          const btn = doc.querySelector('button');
          const ul = doc.querySelector('ul');
          if (!input || !btn || !ul) return false;
          
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value')?.set;
          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(input, 'Yangi vazifa');
          } else {
            input.value = 'Yangi vazifa';
          }
          input.dispatchEvent(new win.Event('input', { bubbles: true }));
          input.dispatchEvent(new win.Event('change', { bubbles: true }));
          
          btn.click();
          await new Promise(r => setTimeout(r, 200));
          
          const items = Array.from(ul.querySelectorAll('li')).map(el => el.textContent.trim());
          return items.some(text => text.includes('Yangi vazifa'));
        }
      },
      {
        id: 'todo-clear-input',
        description: "Tugma bosilgandan so'ng input ichi bo'shab qolishi kerak",
        check: (doc, win) => (doc.querySelector('input')?.value || '') === ''
      }
    ]
  },
  {
    id: 'react-5',
    category: 'react',
    title: 'API orqali foydalanuvchilar ro\'yxatini yuklash',
    difficulty: 'Junior',
    fileName: 'App.jsx',
    description: `Tashqi API'dan ma'lumot yuklab olib, ekranga chiqaring.
Talablar:
1. 'UserList' nomli komponent bo'lsin.
2. Komponent ishga tushganda (useEffect yordamida) "https://jsonplaceholder.typicode.com/users" manziliga GET so'rov yuboring.
3. Yuklab olingan foydalanuvchilar ismlarini (name) '<ul>' ro'yxati ichida '.user-item' klassiga ega '<li>' elementlarida ko'rsating.`,
    initialCode: `import React, { useState, useEffect } from 'react';

export default function UserList() {
  // Kodingizni shu yerga yozing
  
  return (
    <ul>
      {/* Foydalanuvchilar '.user-item' klassi bilan shu yerda shakllansin */}
    </ul>
  );
}
`,
    tests: [
      {
        id: 'users-loading',
        description: "ul tegi sahifada mavjud bo'lishi kerak",
        check: (doc, win) => !!doc.querySelector('ul')
      },
      {
        id: 'users-rendered',
        description: "API'dan ma'lumotlar kelgandan keyin '.user-item' klassli li elementlari yaratilishi shart",
        check: async (doc, win) => {
          // Wait up to 3 seconds for API to load
          for (let i = 0; i < 15; i++) {
            await new Promise(r => setTimeout(r, 200));
            if (doc.querySelectorAll('.user-item').length > 0) return true;
          }
          return false;
        }
      },
      {
        id: 'users-content',
        description: "Birinchi foydalanuvchi 'Leanne Graham' bo'lib ro'yxatda chiqishi kerak",
        check: async (doc, win) => {
          // Wait briefly in case render is delayed
          await new Promise(r => setTimeout(r, 300));
          const items = Array.from(doc.querySelectorAll('.user-item')).map(el => el.textContent.trim());
          return items.some(text => text.includes('Leanne Graham'));
        }
      }
    ]
  }
];
