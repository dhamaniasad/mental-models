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
    id: 'divergent-thinking',
    name: 'Divergent Thinking',
    description: 'A thought process that generates creative ideas by exploring many possible solutions and making unexpected connections, characterized by fluency, flexibility, originality, and elaboration.',
    longDescription: 'Divergent thinking is the ability to develop multiple, unique solutions to a problem rather than identifying a single "correct" answer. It involves generating a large quantity of ideas, exploring different directions, making unusual associations, and building upon existing concepts. This approach stands in contrast to convergent thinking, which focuses on arriving at a single, optimal solution. Divergent thinking is essential for innovation, creative problem-solving, and breaking out of conventional mental patterns. It encourages us to question assumptions, explore alternatives, and generate novel possibilities that might otherwise remain undiscovered. By temporarily suspending judgment and critical analysis, divergent thinking creates a psychological space where creative connections can flourish.',
    howToUse: [
      'Start with a clear problem statement or creative challenge',
      'Generate as many ideas as possible without judging them initially (quantity over quality)',
      'Embrace unusual or seemingly impractical ideas that challenge conventional thinking',
      'Make unexpected connections between different concepts or domains',
      'Build upon existing ideas through elaboration and combination',
      'Use techniques like brainstorming, mind mapping, or random association to stimulate creativity',
      'Only after generating many possibilities, evaluate and refine the most promising ones'
    ],
    realWorldExamples: [
      {
        title: 'Product Innovation',
        description: 'When Apple developed the iPhone, they used divergent thinking to reimagine the mobile phone entirely, combining a phone with internet connectivity, a music player, and a touch interface. Instead of incrementally improving existing phones, they explored radical new possibilities.'
      },
      {
        title: 'Scientific Discovery',
        description: 'In developing the theory of general relativity, Einstein used divergent thinking through thought experiments, visualizing himself riding alongside light beams and imagining the curvature of spacetime. These unconventional mental explorations led to breakthrough insights that transformed physics.'
      },
      {
        title: 'Problem Solving in Business',
        description: 'Faced with declining mall traffic, a retail company used divergent thinking to identify 50+ possible responses rather than just closing stores. Their exploration led to innovative solutions including experiential pop-up shops, community gathering spaces, and partnerships with online brands seeking physical presence.'
      }
    ]
  },
  {
    id: 'lateral-thinking',
    name: 'Lateral Thinking',
    description: 'An indirect and creative approach to problem-solving that explores non-obvious pathways and perspectives, using reasoning that is not immediately logical to find innovative solutions.',
    longDescription: 'Lateral thinking, a term coined by Edward de Bono, involves solving problems through an indirect, creative approach using reasoning that is not immediately obvious. Unlike vertical thinking, which follows a sequential, logical progression, lateral thinking involves viewing problems from unexpected angles and challenging established patterns. It deliberately disrupts conventional thought processes to create new connections and generate fresh insights. Lateral thinking techniques include questioning assumptions, reversing perspectives, using random stimuli, and considering "what if" scenarios that may initially seem unrelated to the problem at hand. This approach is particularly valuable when conventional methods have failed or when innovation is needed to break through entrenched challenges.',
    howToUse: [
      'Challenge fundamental assumptions about the problem ("What if the opposite were true?")',
      'Introduce random elements or perspectives to disrupt conventional thinking patterns',
      'Use provocation techniques that deliberately propose seemingly illogical ideas',
      'Reframe the problem completely from different stakeholder perspectives',
      'Apply analogies from unrelated fields or domains to the situation',
      'Ask "What if?" questions that challenge constraints you\'ve taken for granted',
      'Temporarily set aside practical concerns to allow for unconventional ideas'
    ],
    realWorldExamples: [
      {
        title: 'Medical Innovation',
        description: 'The development of keyhole surgery came from lateral thinking: "Instead of making incisions large enough for hands, what if we created specialized tools that could work through tiny openings?" This approach challenged the fundamental assumption that surgeons needed to directly access organs with their hands.'
      },
      {
        title: 'Business Model Transformation',
        description: 'Netflix\'s shift from DVD rentals to streaming demonstrated lateral thinking. Rather than competing on traditional terms with Blockbuster, they asked, "What if we eliminated late fees entirely and delivered content differently?" This question led to subscription streaming, fundamentally changing how people consume media.'
      },
      {
        title: 'Urban Planning Solutions',
        description: 'When Copenhagen faced traffic congestion and pollution problems, planners used lateral thinking to ask, "What if we designed our city for cyclists rather than cars?" This perspective shift led to one of the world\'s most bicycle-friendly cities, solving multiple problems simultaneously.'
      }
    ]
  },
  {
    id: 'contrarian-thinking',
    name: 'Contrarian Thinking',
    description: 'A deliberate approach to reasoning that involves questioning prevailing wisdom, opposing consensus views, and exploring the value in unpopular or unconventional positions.',
    longDescription: 'Contrarian thinking is the practice of deliberately going against prevailing wisdom, questioning consensus views, and exploring positions that most people reject. It\'s not about being contrary for its own sake, but rather systematically examining whether the crowd is overlooking important information or misinterpreting available data. Contrarian thinkers ask why popular opinions have formed, what evidence supports them, what might be missing from consensus views, and where group dynamics like conformity bias might be influencing collective judgment. This approach is particularly valuable in environments where independence of thought offers competitive advantages, such as investing, scientific research, and entrepreneurship. By being willing to stand apart from the crowd when evidence warrants it, contrarian thinkers can identify both risks and opportunities that others miss.',
    howToUse: [
      'Identify areas of strong consensus or "common knowledge" in your field',
      'Ask what evidence truly supports these consensus views and how strong it is',
      'Consider what information or perspectives might be missing from popular narratives',
      'Explore historical cases where the majority was eventually proven wrong',
      'Develop arguments for positions opposite to the mainstream view',
      'Evaluate whether others\' agreement is based on independent analysis or social factors',
      'Be selective: focus contrarianism on areas where independent thinking offers genuine advantages'
    ],
    realWorldExamples: [
      {
        title: 'Investment Strategy',
        description: 'Legendary investor Warren Buffett exemplifies contrarian thinking with his advice to "be fearful when others are greedy, and greedy when others are fearful." During market downturns when most investors panic-sell, he often makes significant purchases, recognizing that pessimism frequently drives prices below fundamental value.'
      },
      {
        title: 'Scientific Breakthrough',
        description: 'When Barry Marshall proposed that stomach ulcers were caused by bacteria rather than stress or spicy food, the medical establishment rejected his theory. Unable to convince skeptics through conventional means, he famously drank a broth containing H. pylori, developed ulcers, and then cured himself with antibiotics—eventually winning a Nobel Prize for this contrarian insight.'
      },
      {
        title: 'Business Innovation',
        description: 'When Amazon began building AWS (Amazon Web Services), most analysts criticized them for diversifying away from retail into the unrelated cloud computing business. By thinking contrary to conventional business wisdom about "sticking to your core competencies," Amazon created what became its most profitable division and a market-leading position in cloud infrastructure.'
      }
    ]
  },
  {
    id: 'probabilistic-thinking',
    name: 'Probabilistic Thinking',
    description: 'A mental framework that approaches uncertainty by assigning probabilities to various outcomes rather than seeking absolute certainty, leading to more nuanced and accurate decision-making.',
    longDescription: 'Probabilistic thinking is the practice of estimating the likelihood of different outcomes rather than making binary yes/no predictions. This approach recognizes that most real-world situations involve uncertainty and that absolute certainty is rarely achievable or necessary for effective decision-making. By thinking in terms of probability distributions instead of discrete outcomes, we can make more realistic assessments, prepare for multiple scenarios, calibrate confidence appropriately, and update our beliefs systematically as new information becomes available. This mental model is crucial for navigating complex, uncertain environments and helps counteract overconfidence, the planning fallacy, and other cognitive biases that result from our intuitive discomfort with uncertainty.',
    howToUse: [
      'For important decisions, identify multiple possible outcomes, not just the most likely one',
      'Assign explicit probabilities to each outcome based on available evidence',
      'Express confidence levels in ranges rather than single point estimates (e.g., "60-80% chance" rather than "70% chance")',
      'Track your probability estimates over time to calibrate your judgment',
      'Update probabilities incrementally as new information arrives',
      'Consider expected value (probability × impact) when evaluating options',
      'Prepare contingency plans for lower-probability but high-impact outcomes'
    ],
    realWorldExamples: [
      {
        title: 'Weather Forecasting',
        description: 'Modern meteorologists use probabilistic forecasts (e.g., "70% chance of rain") rather than binary predictions. This communicates uncertainty appropriately and allows people to make better-informed decisions about whether to carry an umbrella, reschedule outdoor events, or take other precautions.'
      },
      {
        title: 'Investment Portfolio Strategy',
        description: 'Sophisticated investors construct diversified portfolios based on probabilistic assessments of various market scenarios rather than trying to predict exact market movements. By allocating assets across different probability-weighted outcomes, they create resilient portfolios that can perform acceptably across a range of possible futures.'
      },
      {
        title: 'Entrepreneurial Decision Making',
        description: 'A founder evaluating a new product feature thinks probabilistically: "There\'s a 70% chance this feature increases user engagement by 10-20%, a 20% chance it makes no difference, and a 10% chance it confuses users and reduces engagement." This frames the decision as a calculated risk rather than a guaranteed outcome, informing both the decision and contingency planning.'
      }
    ]
  },
  {
    id: 'black-swan-theory',
    name: 'Black Swan Theory',
    description: 'A framework for understanding the disproportionate role of high-impact, hard-to-predict, and rare events that exceed normal expectations and have massive consequences.',
    longDescription: 'Black Swan Theory, developed by Nassim Nicholas Taleb, describes events that come as a surprise, have a major impact, and are often inappropriately rationalized after the fact with the benefit of hindsight. The term is based on the historical European belief that all swans were white until black swans were discovered in Australia—a metaphor for the limitations of experience-based knowledge and the fragility of our models of the world. Black Swan events are characterized by their extreme rarity, severe impact, and the human tendency to develop explanations for them after they occur, making them seem predictable in retrospect. The theory emphasizes that our world is dominated by the extreme, the unknown, and the highly improbable—not by normal and predictable events—and that we should build systems and strategies that are robust or even antifragile in the face of negative Black Swans while positioning ourselves to benefit from positive ones.',
    howToUse: [
      'Acknowledge the limitations of forecasting and historical data in predicting extreme events',
      'Design systems that are robust to negative Black Swans (like financial crashes or pandemics)',
      'Structure your life and work to potentially benefit from positive Black Swans',
      'Look for asymmetric opportunities with limited downside but nearly unlimited upside',
      'Pay attention to what isn\'t being discussed in your field—blind spots where Black Swans might be hiding',
      'Use scenario planning to imagine extreme events and test the resilience of your plans',
      'Avoid excessive optimization that creates fragility in the face of unexpected events'
    ],
    realWorldExamples: [
      {
        title: 'COVID-19 Pandemic',
        description: 'The global pandemic exemplifies a Black Swan event—it was unexpected by most, had an enormous global impact, and was subsequently explained as predictable despite most institutions being unprepared. Organizations with remote work capabilities, diversified supply chains, and financial reserves weathered the storm better than those optimized solely for normal conditions.'
      },
      {
        title: 'Financial Crisis of 2008',
        description: 'The housing market collapse and subsequent financial crisis was a Black Swan for most participants, who relied on models assuming housing prices wouldn\'t decline simultaneously nationwide. Those who recognized the fragility in the system and positioned accordingly (as depicted in "The Big Short") were able to profit enormously from this rare, high-impact event.'
      },
      {
        title: 'Technological Disruption',
        description: 'The rise of the internet represented a Black Swan for many established businesses. Companies like Blockbuster failed when their business models were rendered obsolete, while adaptable organizations pivoted. Individuals who positioned themselves to benefit from this transformation (by acquiring relevant skills or making early investments in tech companies) experienced positive Black Swan outcomes.'
      }
    ]
  },
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
  },
  {
    id: 'mental-models',
    name: 'Mental Models',
    description: 'Mental models are frameworks for thinking that help simplify complexity, make better decisions, and solve problems more effectively across various domains.',
    longDescription: 'Mental models are conceptual frameworks, representations, or worldviews that help us understand and interpret the world around us. They are simplified versions of how something works that we use to reason, explain phenomena, make predictions, and guide our actions. Charlie Munger, Warren Buffett\'s partner, emphasizes the importance of having a "latticework of mental models" from different disciplines like psychology, economics, physics, and biology. The power of mental models comes from their ability to be applied across various domains and situations, helping us make connections between seemingly unrelated fields, understand complex systems, and avoid common cognitive biases and errors in thinking.',
    howToUse: [
      'Build a diverse collection of mental models from different disciplines',
      'Learn the core principles and limitations of each model',
      'When facing a problem, consciously select the most relevant models',
      'Apply multiple models to the same situation for a more complete understanding',
      'Check for contradictions or insights when different models suggest different approaches',
      'Use models as tools for thought, not rigid rules',
      'Continuously refine and expand your collection of mental models'
    ],
    realWorldExamples: [
      {
        title: 'Decision Making',
        description: 'A CEO uses multiple mental models when deciding whether to acquire a competitor: opportunity cost (economics), network effects (technology), regulatory capture (politics), and confirmation bias (psychology) to make a more comprehensive and balanced assessment.'
      },
      {
        title: 'Product Design',
        description: 'A designer applies mental models from biology (evolution), psychology (cognitive load), economics (incentives), and physics (leverage) to create a user interface that feels intuitive, addresses user needs effectively, and supports the business model of the application.'
      },
      {
        title: 'Career Planning',
        description: 'An individual uses mental models like comparative advantage (economics), compounding (mathematics), and strategy vs. tactics (military) to develop a long-term career plan that maximizes their unique strengths while building valuable skills that accumulate over time.'
      }
    ]
  },
  {
    id: 'first-principles-thinking',
    name: 'First Principles Thinking',
    description: 'A problem-solving approach that involves breaking down complex problems into their most fundamental elements, then reconstructing solutions from the ground up.',
    longDescription: 'First principles thinking is a method of solving problems by breaking them down to their most fundamental, irrefutable truths and then building up from there. Unlike reasoning by analogy, which relies on pattern recognition and comparisons to existing solutions, first principles thinking disregards existing conventional wisdom and asks, "What are the foundational truths in this situation, and what can we derive directly from them?" This approach, championed by Aristotle, Descartes, and more recently by Elon Musk, enables breakthrough innovations by eliminating assumptions and inherited wisdom that may no longer be relevant or accurate. It allows you to see beyond the existing paradigms and create novel solutions based on fundamental realities rather than on precedent or tradition.',
    howToUse: [
      'Identify and clearly define the problem you want to solve',
      'Break down the problem into its fundamental components or truths',
      'Challenge all assumptions and ask "Why?" repeatedly until you reach basic truths',
      'Once you have identified the first principles, build your solution up from those fundamentals',
      'Test your solution against the original problem to ensure it truly addresses the core issues',
      'Be prepared to iterate as you gain new insights into the fundamental truths',
      'Document both your process and the principles you identified for future reference'
    ],
    realWorldExamples: [
      {
        title: 'SpaceX Rocket Development',
        description: 'Elon Musk approached rocket design using first principles. Rather than accepting the conventional wisdom that rockets must be expensive, he broke down rockets into their fundamental components (materials, fuel, etc.) and found that the raw materials cost only about 2% of the typical rocket price. This insight led SpaceX to build rockets from scratch at a fraction of the traditional cost.'
      },
      {
        title: 'Software Architecture Redesign',
        description: 'A tech company struggled with a slow, monolithic application. Instead of incremental improvements, the CTO applied first principles thinking: "What is the core function of our software?" and "What is the most efficient way to deliver that function?" This led to a complete redesign using microservices architecture that significantly improved performance and scalability.'
      },
      {
        title: 'Business Model Innovation',
        description: 'A subscription box company revisited its fundamental purpose—delivering personalized products to customers. By identifying that the core value was curation and discovery, not regular delivery schedules, they redesigned their model to focus on high-quality personalization with flexible timing, increasing customer retention by 40%.'
      }
    ]
  },
  {
    id: 'occams-razor',
    name: 'Occam\'s Razor',
    description: 'A problem-solving principle that suggests when presented with competing hypotheses, the simplest explanation—the one requiring the fewest assumptions—is usually the correct one.',
    longDescription: 'Occam\'s Razor is a principle attributed to the 14th-century logician William of Ockham, stating that "entities should not be multiplied beyond necessity" (often paraphrased as "the simplest explanation is usually the correct one"). It serves as a heuristic guide for scientific modeling, encouraging us to prefer simpler theories over more complex ones when they have equal explanatory power. This principle doesn\'t claim that the simplest explanation is always correct, but rather that simplicity should be preferred when choosing between equally valid explanations. In science, business, and daily decision-making, Occam\'s Razor helps cut through complexity, reduce cognitive load, and avoid over-engineering solutions. It reminds us that additional complexity should only be introduced when it genuinely improves our understanding or solution.',
    howToUse: [
      'When facing multiple possible explanations, list all plausible hypotheses',
      'For each hypothesis, identify the number of assumptions required',
      'Evaluate each hypothesis based on its explanatory power relative to its complexity',
      'Prefer the simplest explanation that adequately accounts for all observed facts',
      'Avoid adding unnecessary complexity unless it significantly improves the explanation',
      'Use as a starting point for investigation, not as absolute proof',
      'Be willing to revisit simpler explanations if new evidence emerges that they cannot explain'
    ],
    realWorldExamples: [
      {
        title: 'Medical Diagnosis',
        description: 'A patient presents with fatigue, increased thirst, and frequent urination. While these could be symptoms of various complex conditions, a doctor applying Occam\'s Razor might first consider diabetes—a single condition that simply explains all symptoms—before investigating more complex combinations of separate disorders.'
      },
      {
        title: 'Software Debugging',
        description: 'When a web application crashes, a developer might hypothesize complex issues like database corruption or network protocol failures. Applying Occam\'s Razor, they first check simpler explanations like syntax errors or memory limits—often finding that these simpler causes are indeed responsible.'
      },
      {
        title: 'Business Strategy',
        description: 'A company experiences declining sales. Executives could develop complex theories involving market shifts, competitor strategies, and macroeconomic factors. However, applying Occam\'s Razor might reveal that a recent price increase—the simplest explanation—is the primary driver of customer behavior.'
      }
    ]
  },
  {
    id: 'hanlons-razor',
    name: 'Hanlon\'s Razor',
    description: 'A principle that suggests we should not attribute to malice what can be adequately explained by incompetence or oversight—helping avoid unnecessary conflict and paranoia.',
    longDescription: 'Hanlon\'s Razor states: "Never attribute to malice that which is adequately explained by stupidity (or incompetence)." This principle encourages us to avoid assuming negative intentions when a situation can be reasonably explained by mistakes, misunderstanding, negligence, or lack of knowledge. It helps counteract our natural tendency toward negativity bias and fundamental attribution error, where we often overestimate others\' negative intentions and underestimate situational factors. By recognizing that most problematic behaviors stem from error rather than malevolence, we can approach conflicts more productively, maintain better relationships, reduce unnecessary hostility, and focus on fixing problems rather than assigning blame. This mental model is especially valuable in collaborative environments and complex organizations where mistakes and miscommunications are inevitable.',
    howToUse: [
      'When someone\'s actions negatively affect you, pause before assuming malicious intent',
      'Consider alternative explanations involving mistakes, miscommunication, or ignorance',
      'Ask yourself: "Could this situation be explained by human error or oversight?"',
      'Seek clarification directly from the person involved',
      'Focus on fixing the problem rather than assigning blame',
      'Remember that people are usually more concerned with their own challenges than with harming others',
      'Use it as a starting assumption, but remain open to evidence that might suggest actual malice'
    ],
    realWorldExamples: [
      {
        title: 'Workplace Collaboration',
        description: 'A colleague fails to include you on an important email thread. Instead of assuming they are deliberately excluding you (malice), applying Hanlon\'s Razor suggests considering that they might have simply forgotten or assumed you were already copied (incompetence). This perspective leads to a constructive conversation rather than workplace conflict.'
      },
      {
        title: 'Customer Service',
        description: 'A company ships the wrong product to a customer. The customer, applying Hanlon\'s Razor, recognizes this as likely a processing error rather than a deliberate attempt to deceive, and contacts customer service with an attitude of problem-solving rather than accusation, resulting in faster resolution.'
      },
      {
        title: 'Software Development',
        description: 'A developer introduces a bug that breaks a critical feature. The team lead applies Hanlon\'s Razor and focuses on fixing the issue and improving code review processes, rather than assuming the developer was careless or incompetent. This maintains team morale while addressing the root cause more effectively.'
      }
    ]
  },
  {
    id: 'bayes-theorem',
    name: 'Bayes\' Theorem',
    description: 'A mathematical framework for updating beliefs based on new evidence, allowing for more accurate probability assessments and better decision-making under uncertainty.',
    longDescription: 'Bayes\' Theorem is a mathematical formula that describes how to update the probability of a hypothesis as more evidence becomes available. Named after 18th-century statistician Thomas Bayes, it provides a formal way to combine prior beliefs with new information to form more accurate posterior beliefs. The theorem is expressed as P(A|B) = [P(B|A) × P(A)] / P(B), where P(A|B) is the probability of hypothesis A given evidence B. Unlike traditional statistical approaches that require fixed hypotheses, Bayesian thinking embraces an iterative process where probabilities are continuously refined as new data emerges. This approach is particularly valuable in complex, uncertain environments where perfect information is unavailable, helping us make better predictions and decisions by systematically incorporating new evidence into our existing knowledge.',
    howToUse: [
      'Start with a prior belief or probability (based on existing knowledge)',
      'Gather new evidence or information related to your hypothesis',
      'Determine how likely you would be to observe this evidence if your hypothesis were true',
      'Update your belief according to Bayes\' formula to get a posterior probability',
      'Use this updated probability as your new prior for future updates',
      'Continue this iterative process as new evidence emerges',
      'Be willing to significantly revise beliefs when strong contrary evidence appears'
    ],
    realWorldExamples: [
      {
        title: 'Medical Diagnosis',
        description: 'A doctor initially estimates a 10% chance that a patient has a rare disease based on symptoms (prior). After a test that is 90% accurate comes back positive, the doctor applies Bayes Theorem to update the probability to about 50%, recognizing that false positives can occur. This more accurate assessment helps avoid unnecessary treatments while still taking the condition seriously.'
      },
      {
        title: 'Product Development',
        description: 'A startup has a hypothesis that users will pay for a premium feature (60% confidence based on market research). After launching a small beta to test willingness to pay, only 20% convert. Using Bayesian updating, they revise their probability assessment downward significantly and pivot to a different monetization strategy before full launch.'
      },
      {
        title: 'Strategic Planning',
        description: 'A company believes there\'s a 70% chance that a competitor will enter their market in the next year. After learning the competitor has just raised significant funding earmarked for expansion (new evidence), they apply Bayesian thinking to update their probability to 90% and accelerate their defensive strategy accordingly.'
      }
    ]
  }
];