/**
 * Mock dictionary dataset.
 *
 * In a real product this is what the search API would return. Keeping it in the
 * same shape a backend would send means the components never need to change if
 * this file is later swapped for a fetch() call - only the data source moves.
 *
 * Every entry is keyed by a lowercase `id` so lookups are case-insensitive
 * without repeatedly lowercasing inside the render path.
 */

export const dictionary = [
  {
    id: 'welcome',
    word: 'welcome',
    urduWord: 'خوش آمدید',
    definitions: [
      {
        partOfSpeech: 'Verb',
        english: ['greet', 'salute', 'receive', 'meet', 'embrace', 'fete', 'usher in'],
        urdu: ['سلام کرنا', 'خیرمقدم کرنا', 'وصول کرنا', 'ملنا', 'گلے لگانا', 'پذیرائی کرنا', 'اندر لانا'],
      },
      {
        partOfSpeech: 'Adjective',
        english: [
          'wanted', 'appreciated', 'popular', 'desirable', 'accepted', 'acceptable',
          'pleasing', 'agreeable', 'gratifying', 'heartening', 'promising',
        ],
        urdu: [
          'مطلوب', 'قابلِ تعریف', 'مقبول', 'پسندیدہ', 'قبول شدہ', 'قابلِ قبول',
          'خوشگوار', 'خوش آئند', 'اطمینان بخش', 'حوصلہ افزا', 'امید افزا',
        ],
      },
      {
        partOfSpeech: 'Noun',
        english: [
          'greetings', 'salutation', 'hail', 'welcoming', 'reception',
          'warm reception', 'favourable reception', 'acceptance', 'hospitality', 'red carpet',
        ],
        urdu: [
          'سلام', 'خیرمقدم', 'استقبال', 'پذیرائی', 'مہمان نوازی',
          'پُرتپاک استقبال', 'گرمجوشی', 'قبولیت', 'ضیافت', 'سرخ قالین',
        ],
      },
    ],
    relatedWords: [
      'Welcoming', 'Well', 'Wellness', 'Welcomes', 'Welcomed', 'Welcome mat',
      'Welcomer', 'Welfare', 'Well-wisher', 'Welcoming party', 'Unwelcome', 'Welcome home',
    ],
    commonPhrases: [
      { english: "you're welcome", urdu: 'خوش آمدید' },
      { english: 'welcome aboard', urdu: 'تشریف آوری مبارک' },
      { english: 'a warm welcome', urdu: 'پُرتپاک استقبال' },
      { english: 'welcome back', urdu: 'واپسی مبارک' },
      { english: 'welcome home', urdu: 'گھر آمد مبارک' },
      { english: 'a welcome change', urdu: 'خوشگوار تبدیلی' },
    ],
    examples: [
      {
        english: 'They gave us a warm welcome at the airport.',
        urdu: 'انہوں نے ایئرپورٹ پر ہمارا پرتپاک استقبال کیا۔',
      },
      {
        english: 'You are always welcome in our home.',
        urdu: 'ہمارے گھر میں آپ کا ہمیشہ خیرمقدم ہے۔',
      },
      {
        english: 'She welcomed the new students with a smile.',
        urdu: 'اس نے نئے طلبہ کا مسکرا کر استقبال کیا۔',
      },
    ],
  },

  {
    id: 'book',
    word: 'book',
    urduWord: 'کتاب',
    definitions: [
      {
        partOfSpeech: 'Noun',
        english: ['volume', 'publication', 'tome', 'paperback', 'manual', 'text'],
        urdu: ['کتاب', 'جلد', 'اشاعت', 'رسالہ', 'دستاویز', 'متن'],
      },
      {
        partOfSpeech: 'Verb',
        english: ['reserve', 'arrange', 'schedule', 'charter', 'engage', 'register'],
        urdu: ['محفوظ کرانا', 'بندوبست کرنا', 'طے کرنا', 'کرائے پر لینا', 'مقرر کرنا', 'اندراج کرنا'],
      },
    ],
    relatedWords: [
      'Booking', 'Booklet', 'Bookshelf', 'Bookmark', 'Bookstore', 'Bookish',
      'Booked', 'Bookkeeper', 'Bookcase', 'Handbook', 'Notebook', 'Textbook',
    ],
    commonPhrases: [
      { english: 'book a ticket', urdu: 'ٹکٹ بک کرانا' },
      { english: 'open book', urdu: 'کھلی کتاب' },
      { english: 'by the book', urdu: 'اصول کے مطابق' },
      { english: 'book a room', urdu: 'کمرہ محفوظ کرانا' },
      { english: 'a good read', urdu: 'عمدہ کتاب' },
      { english: 'close the book', urdu: 'باب ختم کرنا' },
    ],
    examples: [
      {
        english: 'I borrowed this book from the library.',
        urdu: 'میں نے یہ کتاب لائبریری سے مستعار لی۔',
      },
      {
        english: 'Please book a table for two.',
        urdu: 'براہ کرم دو افراد کے لیے میز محفوظ کرا دیں۔',
      },
      {
        english: 'He wrote his first book at twenty.',
        urdu: 'اس نے اپنی پہلی کتاب بیس سال کی عمر میں لکھی۔',
      },
    ],
  },

  {
    id: 'happy',
    word: 'happy',
    urduWord: 'خوش',
    definitions: [
      {
        partOfSpeech: 'Adjective',
        english: [
          'joyful', 'cheerful', 'content', 'delighted', 'glad',
          'pleased', 'merry', 'elated', 'jubilant', 'satisfied',
        ],
        urdu: [
          'خوش', 'شاداں', 'مطمئن', 'مسرور', 'خوشحال',
          'راضی', 'پُرمسرت', 'باغ باغ', 'شادمان', 'آسودہ',
        ],
      },
    ],
    relatedWords: [
      'Happiness', 'Happily', 'Happier', 'Happiest', 'Unhappy', 'Happy-go-lucky',
      'Hapless', 'Haply', 'Happenstance', 'Content', 'Cheerful', 'Joyful',
    ],
    commonPhrases: [
      { english: 'happy birthday', urdu: 'سالگرہ مبارک' },
      { english: 'happily ever after', urdu: 'ہمیشہ خوش رہے' },
      { english: 'happy to help', urdu: 'مدد کر کے خوشی ہوئی' },
      { english: 'a happy ending', urdu: 'خوشگوار انجام' },
      { english: 'happy hour', urdu: 'رعایتی گھڑی' },
      { english: 'perfectly happy', urdu: 'مکمل مطمئن' },
    ],
    examples: [
      {
        english: 'She was happy to hear the good news.',
        urdu: 'وہ اچھی خبر سن کر خوش ہوئی۔',
      },
      {
        english: 'They lived a happy life together.',
        urdu: 'انہوں نے مل کر خوشگوار زندگی گزاری۔',
      },
      {
        english: 'I am happy with the result.',
        urdu: 'میں نتیجے سے مطمئن ہوں۔',
      },
    ],
  },

  {
    id: 'water',
    word: 'water',
    urduWord: 'پانی',
    definitions: [
      {
        partOfSpeech: 'Noun',
        english: ['liquid', 'rain', 'aqua', 'moisture', 'fluid'],
        urdu: ['پانی', 'آب', 'بارش', 'نمی', 'مائع'],
      },
      {
        partOfSpeech: 'Verb',
        english: ['irrigate', 'sprinkle', 'moisten', 'douse', 'hydrate'],
        urdu: ['سیراب کرنا', 'چھڑکنا', 'تر کرنا', 'بھگونا', 'پانی دینا'],
      },
    ],
    relatedWords: [
      'Watery', 'Waterfall', 'Watermark', 'Waterproof', 'Watershed', 'Watering',
      'Underwater', 'Freshwater', 'Waterway', 'Watercolour', 'Waterlogged', 'Rainwater',
    ],
    commonPhrases: [
      { english: 'drinking water', urdu: 'پینے کا پانی' },
      { english: 'still waters', urdu: 'ٹھہرا ہوا پانی' },
      { english: 'water under the bridge', urdu: 'گزری ہوئی بات' },
      { english: 'test the waters', urdu: 'صورتحال جانچنا' },
      { english: 'fresh water', urdu: 'میٹھا پانی' },
      { english: 'water the plants', urdu: 'پودوں کو پانی دینا' },
    ],
    examples: [
      {
        english: 'Please bring me a glass of water.',
        urdu: 'براہ کرم مجھے ایک گلاس پانی لا دیں۔',
      },
      {
        english: 'The farmer waters his crops every morning.',
        urdu: 'کسان ہر صبح اپنی فصلوں کو پانی دیتا ہے۔',
      },
      {
        english: 'The water in this river is very clean.',
        urdu: 'اس دریا کا پانی بہت صاف ہے۔',
      },
    ],
  },

  {
    id: 'friend',
    word: 'friend',
    urduWord: 'دوست',
    definitions: [
      {
        partOfSpeech: 'Noun',
        english: [
          'companion', 'comrade', 'ally', 'mate', 'confidant',
          'well-wisher', 'associate', 'partner',
        ],
        urdu: [
          'دوست', 'ساتھی', 'رفیق', 'یار', 'ہمدم',
          'خیرخواہ', 'شریک', 'ہمراز',
        ],
      },
      {
        partOfSpeech: 'Verb',
        english: ['befriend', 'accompany', 'support'],
        urdu: ['دوستی کرنا', 'ساتھ دینا', 'حمایت کرنا'],
      },
    ],
    relatedWords: [
      'Friendly', 'Friendship', 'Friendliness', 'Befriend', 'Unfriendly', 'Boyfriend',
      'Girlfriend', 'Friendless', 'Best friend', 'Companion', 'Ally', 'Comrade',
    ],
    commonPhrases: [
      { english: 'best friend', urdu: 'بہترین دوست' },
      { english: 'old friend', urdu: 'پرانا دوست' },
      { english: 'a friend in need', urdu: 'مشکل وقت کا دوست' },
      { english: 'make friends', urdu: 'دوست بنانا' },
      { english: 'close friend', urdu: 'قریبی دوست' },
      { english: 'friendly advice', urdu: 'دوستانہ مشورہ' },
    ],
    examples: [
      {
        english: 'He is my closest friend.',
        urdu: 'وہ میرا سب سے قریبی دوست ہے۔',
      },
      {
        english: 'She made new friends at school.',
        urdu: 'اس نے اسکول میں نئے دوست بنائے۔',
      },
      {
        english: 'A true friend helps in hard times.',
        urdu: 'سچا دوست مشکل وقت میں کام آتا ہے۔',
      },
    ],
  },
];

/** The entry shown before the user has searched for anything. */
export const DEFAULT_WORD_ID = 'welcome';

/**
 * Finds one entry by its word.
 * Returns undefined when there is no match so the caller can render an
 * explicit "not found" state rather than silently showing stale results.
 */
export function findEntry(term) {
  const normalised = term.trim().toLowerCase();
  return dictionary.find((entry) => entry.id === normalised);
}

/**
 * Powers the search suggestions dropdown.
 * Prefix matches are ranked above substring matches, because someone typing
 * "we" almost certainly wants "welcome" rather than "flower".
 */
export function searchEntries(term, limit = 5) {
  const normalised = term.trim().toLowerCase();
  if (!normalised) return [];

  const prefix = [];
  const contains = [];

  for (const entry of dictionary) {
    if (entry.id.startsWith(normalised)) prefix.push(entry);
    else if (entry.id.includes(normalised)) contains.push(entry);
  }

  return [...prefix, ...contains].slice(0, limit);
}
