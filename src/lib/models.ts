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
  },
  {
    id: 'eisenhower-matrix',
    name: 'Eisenhower Matrix',
    description: 'A decision-making framework that helps prioritize tasks by urgency and importance, sorting activities into four categories to determine how to handle them.',
    longDescription: 'The Eisenhower Matrix, named after President Dwight D. Eisenhower, is a productivity and decision-making tool that helps individuals prioritize tasks by evaluating them across two dimensions: urgency and importance. The framework creates four quadrants that guide how you should approach different types of tasks: 1) Urgent and Important (Do first), 2) Important but Not Urgent (Schedule), 3) Urgent but Not Important (Delegate), and 4) Neither Urgent nor Important (Eliminate). By categorizing tasks this way, you can focus on what truly matters while reducing time spent on less impactful activities.',
    howToUse: [
      'List all your tasks and responsibilities',
      'Evaluate each task on two dimensions: urgency and importance',
      'Place each task in the appropriate quadrant',
      'Quadrant 1 (Urgent & Important): Do these tasks immediately',
      'Quadrant 2 (Important & Not Urgent): Schedule time for these tasks',
      'Quadrant 3 (Urgent & Not Important): Delegate these tasks if possible',
      'Quadrant 4 (Not Urgent & Not Important): Eliminate these tasks'
    ],
    realWorldExamples: [
      {
        title: 'Project Management',
        description: 'A product manager uses the Eisenhower Matrix to organize development tasks, immediately addressing critical bugs (Q1), scheduling feature planning sessions (Q2), delegating routine documentation updates (Q3), and eliminating unnecessary meetings (Q4).'
      },
      {
        title: 'Personal Productivity',
        description: 'A working parent uses the matrix to balance responsibilities, prioritizing a child\'s doctor appointment (Q1), scheduling regular exercise (Q2), delegating household chores (Q3), and cutting back on mindless social media browsing (Q4).'
      },
      {
        title: 'Business Strategy',
        description: 'A startup CEO applies the matrix to allocate limited resources, focusing on addressing cash flow issues (Q1), developing long-term growth strategies (Q2), delegating routine administrative tasks (Q3), and eliminating pursuit of non-strategic partnership opportunities (Q4).'
      }
    ]
  },
  {
    id: 'second-order-thinking',
    name: 'Second-Order Thinking',
    description: 'A way of thinking that considers the long-term consequences, interactions, and subsequent effects of decisions beyond their immediate outcomes.',
    longDescription: 'Second-order thinking is a mental model that involves considering the long-term and cascading consequences of decisions or actions—looking beyond the immediate, first-order effects. While first-order thinking asks "What will happen next?", second-order thinking asks "And then what?" multiple times. This type of thinking helps us avoid unintended consequences, spot opportunities others miss, and make decisions that benefit us in the long run, even if they appear suboptimal in the short term. By anticipating ripple effects and indirect impacts, second-order thinking leads to more robust decision-making and planning.',
    howToUse: [
      'When making a decision, first identify the immediate or first-order consequences',
      'For each consequence, ask "And then what?" to identify second-order effects',
      'Continue this process to third and fourth-order effects as relevant',
      'Consider both positive and negative potential outcomes',
      'Look for non-linear relationships and feedback loops',
      'Identify potential unintended consequences',
      'Make decisions with the full chain of consequences in mind, not just immediate results'
    ],
    realWorldExamples: [
      {
        title: 'Environmental Policy',
        description: 'A city bans plastic bags (first-order effect: reduced plastic waste). Second-order effect: increased production of reusable bags, which may have higher carbon footprints if not used many times. Third-order effect: changing consumer behavior toward more sustainable habits across other product categories.'
      },
      {
        title: 'Technology Product Development',
        description: 'A social media company creates an algorithm maximizing engagement (first-order effect: increased user time on platform). Second-order effect: content becomes more polarizing. Third-order effect: societal division increases. Fourth-order effect: regulatory backlash against the company.'
      },
      {
        title: 'Investment Strategy',
        description: 'An investor chooses not to sell during a market crash (first-order effect: avoiding locking in losses). Second-order effect: having capital available when quality assets are undervalued. Third-order effect: compounded returns on discounted investments during the subsequent recovery, significantly outperforming reactive investors.'
      }
    ]
  },
  {
    id: 'circle-of-competence',
    name: 'Circle of Competence',
    description: 'A concept that helps identify areas where you have an advantage due to experience and knowledge, and distinguish them from areas where you lack expertise.',
    longDescription: 'The Circle of Competence is a mental model popularized by Warren Buffett and Charlie Munger that emphasizes the importance of recognizing the boundaries of your knowledge and expertise. Within your circle are subjects you understand well enough to make reliable judgments and predictions. Outside this circle are areas where you lack the necessary knowledge or experience to make sound decisions. By understanding your circle\'s boundaries, you can focus your efforts where you have genuine insight, avoid costly mistakes in unfamiliar territories, and make strategic decisions about when and how to expand your competence into new areas.',
    howToUse: [
      'Make an honest assessment of what you know well and what you don\'t',
      'Document your areas of expertise with specific boundaries',
      'Identify how you acquired competence in these areas (formal education, experience, etc.)',
      'When making decisions, evaluate whether they fall within your circle',
      'For areas outside your circle, either avoid making decisions, seek expert help, or invest time in expanding your knowledge',
      'Regularly re-evaluate and update your understanding of your circle\'s boundaries',
      'Look for intersections of multiple areas of competence where you might have unique insights'
    ],
    realWorldExamples: [
      {
        title: 'Investment Strategy',
        description: 'Warren Buffett famously stays within his circle of competence by investing primarily in businesses he understands. He avoided tech stocks during the dot-com bubble because technology was outside his circle, helping him prevent massive losses when the bubble burst.'
      },
      {
        title: 'Career Development',
        description: 'A marketing professional with strong data analysis skills builds her career at the intersection of creative marketing and quantitative analysis, developing specialized expertise in data-driven marketing that commands premium compensation due to the rare combination of competencies.'
      },
      {
        title: 'Entrepreneurship',
        description: 'A former restaurant manager starts a food service business rather than a tech startup, leveraging his deep understanding of food operations, supplier relationships, and customer preferences. He partners with a tech expert to handle the digital aspects that are outside his circle of competence.'
      }
    ]
  },
  {
    id: 'inversion',
    name: 'Inversion',
    description: 'A problem-solving approach that flips conventional thinking by focusing on avoiding failure rather than achieving success, asking "what could go wrong?" instead of "how can I succeed?"',
    longDescription: 'Inversion is a powerful mental model that involves approaching problems backward. Instead of focusing directly on how to achieve a goal, you consider what would cause the opposite result and work to avoid those pitfalls. This technique, championed by mathematician Carl Jacobi who advised "Invert, always invert," and popularized by Charlie Munger, helps identify hidden obstacles, potential failure points, and cognitive blindspots. By thinking backward from the outcome you want to avoid, you often gain more actionable insights than by only thinking forward from your current position toward your goal. Inversion complements forward thinking rather than replacing it.',
    howToUse: [
      'Clearly define your goal or problem',
      'Flip the perspective by asking "What would guarantee failure in this situation?"',
      'List all the ways in which you could fail to achieve your objective',
      'Analyze each failure scenario and identify specific ways to prevent them',
      'Create a plan that systematically avoids these failure paths',
      'Use this inverted perspective alongside traditional forward planning',
      'Periodically revisit your inversion analysis to identify new potential failure points'
    ],
    realWorldExamples: [
      {
        title: 'Product Development',
        description: 'Instead of only asking "How do we build a successful product?", a development team asks "What would make customers hate our product?". This reveals critical issues like poor performance, complex interfaces, and data privacy concerns that become top priorities to address.'
      },
      {
        title: 'Financial Planning',
        description: 'Rather than focusing solely on how to get rich, an individual identifies all the ways they could lose money or go bankrupt (high debt, insufficient emergency funds, concentration risk). By systematically addressing these risks first, they build a solid financial foundation.'
      },
      {
        title: 'Relationship Building',
        description: 'A manager works to build team cohesion not only by considering what makes great teams, but by identifying and eliminating behaviors that destroy trust (taking credit for others\' work, inconsistent rules, poor communication). Removing these negative factors proves more impactful than adding positive initiatives.'
      }
    ]
  }
];