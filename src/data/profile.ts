import { dayjs } from '../shared/dayjs-with-plugins';
import { getTotalYearOfExperience } from '../shared/helper';

export const profile = {
  name: 'Nguyen Truong Giang',
  career: 'Software Engineer',

  yearOfExp: `${getTotalYearOfExperience()} years experience`,

  avatar: '/images/gk.jpg',

  about: [
    'My career path is to become a professional Fullstack Developer, who can create high quality, secure and friendly products which can satify the expectation of customers.',
    'I look forward to working with a professional team, where i can enjoy learning and sharing to help each other growth, practicing my skills so I can adapt well to the needs and flexible changes of the market.',
    'It would be great if I had the opportunity to work in an environment where English is the key point because I want to focus training my ability to communicate and work in English.',
  ],

  personals: [
    {
      image: 'today',
      content: dayjs('1995/11/17').format('LL'),
    },
    {
      image: 'face',
      content: 'Male',
    },
    {
      image: 'location_on',
      content: 'Go Vap District, HCMC',
    },
    {
      image: 'school',
      content: 'International UniverSity - HCMC',
      subContent: `Electrical Engineering`,
    },
  ],

  contacts: [
    {
      image: 'phone_iphone',
      content: '0978205130',
      type: 'text',
    },
    {
      image: 'email',
      content: 'nguyentruonggiang1711@gmail.com',
      type: 'text',
    },
    {
      image: 'message',
      content: 'live:nguyentruonggiang1711',
      type: 'text',
    },
    {
      image: 'facebook',
      content: 'facebook.com/gknguyen1711',
      type: 'url',
    },
    {
      image: 'work',
      content: 'linkedin.com/in/gknguyen1711',
      type: 'url',
    },
    {
      image: 'integration_instructions',
      content: 'github.com/gknguyen',
      type: 'url',
    },
  ],

  skills: [
    {
      category: 'Languages',
      image: 'g_translate',
      list: ['English (IELTS 6.5)', 'French (DELF A2)'],
    },
    {
      category: 'Programming Languages',
      image: 'code',
      list: ['Javascript (Typescript)', 'Golang'],
    },
    {
      category: 'Back-end',
      image: 'storage',
      list: ['Node.js, Express.js, Nest.js', 'MySQL, PostgreSQL', 'MongoDB, Redis'],
    },
    {
      category: 'Front-end',
      image: 'devices_other',
      list: [
        'HTML5, CSS3, Bootstrap 4',
        'React.js, Redux',
        'Material-UI, Ant Design',
        'Tailwind CSS',
      ],
    },
    {
      category: 'Automation test',
      image: 'build_circle',
      list: ['Mocha, Chai, Istanbul', 'Jest, Enzyme', 'Puppeteer, Cypress'],
    },
    {
      category: 'AWS Cloud',
      image: 'cloud',
      list: [
        'EC2, ASG, VPC',
        'S3, Cloudfront',
        'RDS, IAM, Route 53',
        'Code Artifact, ECR',
        'Cloud Formation',
      ],
    },
    {
      category: 'Other',
      image: 'settings',
      list: [
        'Docker',
        'Electron.js',
        'Kafka, RabbitMQ',
        'Git, Git flow',
        'RESTful API',
        'Fluentd',
        'Github/Gitlab CI/CD',
      ],
    },
  ],

  certificates: [
    {
      name: 'AWS',
      list: [
        {
          name: 'Solutions Architect (Associate)',
          isPopup: false,
          link: 'https://www.credly.com/badges/b36874f3-2255-43c7-830e-33f6a7859c72?source=linked_in_profile',
        },
      ],
    },
    {
      name: 'Whizlabs certificates',
      list: [
        {
          name: 'Docker Certified Associate',
          isPopup: true,
          link: '/images/certificates/docker.jpg',
        },
        {
          name: 'Git & Github Training Course',
          isPopup: true,
          link: '/images/certificates/github.jpg',
        },
        {
          name: 'Apache Kafka Fundamentals',
          isPopup: true,
          link: '/images/certificates/kafka.jpg',
        },
      ],
    },
    {
      name: 'HackerRank',
      list: [
        {
          name: 'JavaScript (Basic) Certificate',
          isPopup: false,
          link: 'https://www.hackerrank.com/certificates/bbab0102001c',
        },
        {
          name: 'Node (Basic) Certificate',
          isPopup: false,
          link: 'https://www.hackerrank.com/certificates/3f593fff5b7d',
        },
        {
          name: 'React (Basic) Certificate',
          isPopup: false,
          link: 'https://www.hackerrank.com/certificates/14edc9ed18f5',
        },
      ],
    },
    {
      name: 'Udemy',
      list: [
        {
          name: 'AWS Cert Developer Associate',
          isPopup: false,
          link: 'https://www.udemy.com/certificate/UC-f02acd1a-b78b-4c28-bae7-9ea8e6e23ab1/',
        },
      ],
    },
  ],

  experiences: [
    {
      key: 'setel',
      title: 'SETEL',
      period: 'Jul 2021 - Jul 2024',
      position: 'Full-stack Engineer',
      logo: '/images/setel.png',
      descriptions: [
        'Building Setel App platforms & system for Petronas corporation in Malaysia, a super application (like Grab or Momo) in Malaysia, focus on fuel purchase & vehicle management, loyalty points, v..v..',
        'Working with backend microservices system based on Nodejs',
        'Build Web Apps for users/merchants, Admin Panel for Admins',
        'Communicating in English with international teams',
      ],
      projectsCssClass: 'sm:h-[300px] md:h-[442px]',
      projects: [
        {
          name: 'Family Wallet members',
          position: 'BE Engineer',
          descriptions: [
            'A feature which allow user to create a family group, other members in the group can use their payment method to purchase',
            'Tech Stacks : Nest.js, MongoDB, Redis v...v...',
            'Resource : 5 members',
            'Period : 6 months',
          ],
        },
        {
          name: 'Places on Map',
          position: 'Full-stack Engineer',
          descriptions: [
            'Manage Places information to display on Map',
            'Tech Stacks : Nest.js, MongoDB, AWS S3, Kafka, Pubsub, React.js, Tailwind CSS v...v...',
            'Resource : 5 members',
            'Period : 1 year',
          ],
        },
        {
          name: 'Loyalty points capping',
          position: 'BE Engineer',
          descriptions: [
            'A feature to put a cap limit quota for the amount of loyalty that user can earned in 1 month',
            'Tech Stacks : Nest.js, MongoDB, Kafka, v...v...',
            'Resource : 2 members',
            'Period : 5 months',
          ],
        },
        {
          name: 'Setel Lite Web for Guest user',
          position: 'Full-stack Engineer',
          descriptions: [
            'A light Web App which allow guest user to have their own loyalty barcode for CDS/POS scanning to earn points, for experience purpose',
            'Tech Stacks : Nest.js, MongoDB, React.js, Tailwind CSS, v...v...',
            'Resource : 2 members',
            'Period : 3 months',
          ],
        },
      ],
    },
    {
      key: 'geo',
      title: 'GEO SYSTEM SOLUTIONS VIETNAM',
      period: 'Feb 2020 - Jun 2021',
      position: 'Full-stack Engineer',
      logo: '/images/geo.png',
      descriptions: [
        'Providing IT solutions for GEO corporation in Japan',
        'Handling full life cycle of projects - from Front-end, Back-end to deployment',
        'communicating in Japan with co-workers and clients',
      ],
      projectsCssClass: 'h-[175px]',
      projects: [
        {
          name: 'Task Manage System',
          position: 'Full-stack Engineer',
          descriptions: [
            'Task management, employee management, man-hours management',
            'Web Application',
            'Tech Stacks : React.js + Express.js',
            'Resource : 4 members',
            'Period : 1 year',
          ],
        },
        {
          name: "Purchased Product's status Finder",
          position: 'Team Leader',
          descriptions: [
            "Research Purchased Product's status, generate logs in server, auto checking update",
            'Desktop Application',
            'Tech Stacks : Electron.js + React.js',
            'Resource : 2 members',
            'Period : 3 months',
          ],
        },
      ],
    },
    {
      key: 'capgemini',
      title: 'CAPGEMINI VIETNAM',
      period: 'Sep 2018 - Jan 2020',
      position: 'Software Engineer',
      logo: '/images/capgemini.jpeg',
      descriptions: [
        'Providing IT solutions for AXA Insurance corporation in France',
        'Working with backend systems based on COBOL language',
        'Communicating in French with co-workers and clients',
      ],
      projectsCssClass: 'h-[78px]',
      projects: [
        {
          name: 'AXAPAC',
          position: 'Software Engineer',
          descriptions: [
            "Customer data processing, Contract's fee calculation",
            'Tech Stacks : Cobol, IMS mainframe',
            'Resource : more than 50 members',
          ],
        },
      ],
    },
    {
      key: 'reetech',
      title: 'REETECH INDUSTRY SUMMER INTERSHIP',
      period: 'Jun 2017 – Sep 2017',
      position: 'Mechanical/Electrical Engineer',
      logo: '/images/reetech.png',
      descriptions: [
        'Learned how to build and fix switchboards',
        'Learned how to use some automatic machines like QUADA AE2510 NT',
        'Learned some knowledge of some type of air-conditioner products',
      ],
    },
  ],

  projects: [
    {
      period: 'Mar 2021 - Jul 2021',
      title: 'COLEAD network',
      type: 'Freelance project',
      descriptions: [
        'A social platform aims to connect people in business & startup fields',
        'Using React Native for Mobile platform',
        'Using Express.js (Typescript) for server',
        'Using PostgesSQL server for database',
        'Deploy in AWS cloud server',
      ],
    },
    {
      period: 'Jul 2020 - Now',
      title: 'MY CV TEMPLATE',
      type: 'Personal project',
      descriptions: [
        'The web version of my Curriculum Vitae (CV)',
        'Using React.js (Typescript) & Material-UI for Web platform',
        'Using Golang for server',
        'Deploy in AWS S3 + Cloudfront',
      ],
    },
    {
      period: 'Jun 2020 - Feb 2021',
      title: 'SMARTVIETSOLUTION',
      type: 'Freelance project',
      descriptions: [
        'An e-commercial web app which provides website templates for customers with many kinds of business aspect such as food, clothes, electronic and enterprises.',
        'Based on PHP language with Laravel MVC framework',
        'Using Bootstrap to build Web platform',
        'Using MySQL for database',
      ],
    },
    {
      period: 'Jul 2019 – Dec 2019',
      title: 'CENTURY RESTAURANT MANAGEMENT SYSTEM',
      type: 'Personal project',
      descriptions: [
        'Application features: create booking, create contract, storage management, financial management, employee management',
        'Using React.js (Typescript) for Web platform',
        'Using Express.js (Typescript) for server',
        'Using Postgres server for database',
      ],
    },
    {
      period: 'Sep 2017 – Jun 2018',
      title: 'BUILD A GAS LEAKED MONITORING SYSTEM BASED ON WIRELESS NETWORKS',
      type: 'Graduation project',
      descriptions: [
        'Using Arduino for processor and LoraWan network',
        'Studying C/C++ language as well as HTML, CSS, Javascript for Web platform',
        'Learning the knowledge of wireless sensor networks',
      ],
    },
  ],
};

export type ProfileType = typeof profile;
export type PersonalType = (typeof profile.personals)[0];
export type ContactType = (typeof profile.contacts)[0];
export type SkillType = (typeof profile.skills)[0];
export type ProjectType = (typeof profile.projects)[0];
export type CertificateImage = { name: string; link: string };
export type ExperienceType = (typeof profile.experiences)[0];
