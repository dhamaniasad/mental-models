export interface Model {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  howToUse: string[];
  realWorldExamples: {
    title: string;
    description: string;
  }[];
}

export const models: Model[] = [
  {
    id: 'ikigai',
    name: 'Ikigai',
    description: 'A Japanese concept meaning "a reason for being" - the intersection of what you love, what you are good at, what the world needs, and what you can be paid for.',
    longDescription: 'Ikigai is a Japanese concept that means "a reason for being." The word refers to having a direction or purpose in life, that which makes one\'s life worthwhile, and towards which an individual takes spontaneous and willing actions giving them satisfaction and a sense of meaning to life. It is at the intersection of four elements: what you love (your passion), what you are good at (your profession), what the world needs (your mission), and what you can be paid for (your vocation).',
    howToUse: [
      'Identify activities and interests that you love doing',
      'Assess your skills and strengths objectively',
      'Consider what services or products the world actually needs',
      'Determine what people would be willing to pay you for',
      'Look for the overlaps between these four areas',
      'Experiment with different combinations until you find your sweet spot'
    ],
    realWorldExamples: [
      {
        title: 'Career Transition',
        description: 'A software engineer who loves teaching discovers they can combine their technical expertise with their passion for education by creating online programming courses, addressing the world\'s need for accessible tech education while earning income.'
      },
      {
        title: 'Entrepreneurship',
        description: 'A chef with expertise in nutrition launches a meal preparation service for busy health-conscious professionals, combining their culinary skills with their passion for healthy eating, meeting a market need, and creating a sustainable business.'
      },
      {
        title: 'Retirement Planning',
        description: 'A retired executive volunteers to mentor young entrepreneurs, using their business expertise (what they\'re good at) to help others (what the world needs) in an activity they enjoy (what they love) that could potentially lead to paid consulting work.'
      }
    ]
  }
];