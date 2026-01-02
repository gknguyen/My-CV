import { dayjs } from '../shared/dayjs-with-plugins';
import { getTotalYearOfExperience } from '../shared/helper';

export const profile = {
  name: 'Nguyen Truong Giang',
  career: 'Software Engineer',

  yearOfExp: `${getTotalYearOfExperience()} years experience`,

  avatar: '/images/gk.jpg',

  about: [
    'My career path is to become a expert in this field of expertise, be able to handle all the process to build many kind of Applications. I look forward to learning and working with new technologies in the current 4.0 generation economy, practicing my skills so I can adapt well to the needs and flexible changes of the market.',
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
      image: 'contact_page',
      content: 'gk-dev.click',
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
        'React.js, Redux, Next.js',
        'Material-UI, Ant Design',
        'Tailwind CSS',
        'Google Map, Stadia Map',
      ],
    },
    {
      category: 'Automation test',
      image: 'build_circle',
      list: ['Mocha, Chai, Istanbul', 'Jest, Enzyme', 'Puppeteer, Cypress', 'k6, Locust'],
    },
    {
      category: 'Other',
      image: 'settings',
      list: [
        'Docker, k8s, Helm, ArgoCD',
        'Electron.js',
        'Kafka, RabbitMQ',
        'Git, Git flow',
        'RESTful API, gRPC',
        'Fluentd',
        'Github/Gitlab CI/CD',
        'AWS, GCP',
      ],
    },
  ],

  certificates: [
    {
      key: 'aws',
      name: 'AWS',
      list: [
        {
          name: 'Solutions Architect (Associate)',
          isShow: true,
          isPopup: false,
          link: 'https://www.credly.com/badges/b36874f3-2255-43c7-830e-33f6a7859c72',
          image: '/images/certificates/aws/solutions-architect-associate.png',
        },
        {
          name: 'Developer (Associate)',
          isShow: true,
          isPopup: false,
          link: 'https://www.credly.com/badges/fd98574f-ebc6-4105-85ed-f5358fbb1c68',
          image: '/images/certificates/aws/developer-associate.png',
        },
      ],
    },
    {
      key: 'hackerRank',
      name: 'HackerRank',
      list: [
        {
          name: 'Software Engineer Intern',
          isShow: false,
          isPopup: false,
          link: 'https://www.hackerrank.com/certificates/4f2d85729b08',
          image: '/images/certificates/hackerrank/engineer-intern.png',
        },
        {
          name: 'JavaScript (Basic)',
          isShow: true,
          isPopup: false,
          link: 'https://www.hackerrank.com/certificates/bbab0102001c',
          image: '/images/certificates/hackerrank/js-basic.png',
        },
        {
          name: 'Node (Intermediate)',
          isShow: true,
          isPopup: false,
          link: 'https://www.hackerrank.com/certificates/2d48f3f7f145',
          image: '/images/certificates/hackerrank/node-intermediate.png',
        },
        {
          name: 'React (Basic)',
          isShow: true,
          isPopup: false,
          link: 'https://www.hackerrank.com/certificates/14edc9ed18f5',
          image: '/images/certificates/hackerrank/react-basic.png',
        },
      ],
    },
    {
      key: 'whizlabs',
      name: 'Whizlabs certificates',
      list: [
        {
          name: 'Docker Certified Associate',
          isShow: true,
          isPopup: true,
          link: undefined,
          image: '/images/certificates/whizlabs/docker.jpg',
        },
        {
          name: 'Git & Github Training Course',
          isShow: true,
          isPopup: true,
          link: undefined,
          image: '/images/certificates/whizlabs/github.jpg',
        },
        {
          name: 'Apache Kafka Fundamentals',
          isShow: true,
          isPopup: true,
          link: undefined,
          image: '/images/certificates/whizlabs/kafka.jpg',
        },
      ],
    },
    {
      key: 'udemy',
      name: 'Udemy',
      list: [
        {
          name: 'AWS Cert Developer Associate',
          isShow: false,
          isPopup: false,
          link: 'https://www.udemy.com/certificate/UC-f02acd1a-b78b-4c28-bae7-9ea8e6e23ab1/',
          image: '/images/certificates/udemy/aws-certified-developer-associate.jpg',
        },
        {
          name: 'Kubernetes Hands-On (AWS)',
          isShow: false,
          isPopup: false,
          link: 'https://www.udemy.com/certificate/UC-0153562b-1c4f-4348-b3c3-493d81c5e434/',
          image: '/images/certificates/udemy/k8s-hands-on-aws.jpg',
        },
        {
          name: 'Go - The Complete Guide',
          isShow: false,
          isPopup: false,
          link: 'https://www.udemy.com/certificate/UC-0bd2ee22-e1af-47e1-9cfe-2e1835ae969a/',
          image: '/images/certificates/udemy/golang-guideline-for-beginner.jpg',
        },
      ],
    },
  ],

  experiences: [
    {
      key: 'clt',
      title: 'CyberLogitec Vietnam',
      period: 'Aug 2024 - Dec 2025',
      position: 'Technical Architect',
      logo: '/images/clt.png',
      descriptions: [
        'Building system & platforms for managing shipping and logistics for CLT clients',
        'Achievement : Got promoted to Technical Architect position after 2 months of working, responsible for infrastructure optimization, enhance CI/CD pipelines, setup automation tests & train team members',
      ],
      projectsCssClass: 'sm:h-[240px] md:h-[350px]',
      projects: [
        {
          name: 'Customer Subscription Plan',
          position: 'Technical Architect',
          descriptions: [
            'Managing Subscription Plan of Customers, allowing them to view data of their Reefer Containers',
            'Tech Stacks : Nest.js, Next.js, Postgres, Redis, GCP, Kubernetes, Argocd, Kafka v...v...',
            'Resource : 12 members',
          ],
        },
        {
          name: 'IoT Data Pipeline',
          position: 'Technical Architect',
          descriptions: [
            'Managing IoT data of Reefer Containers, streaming data from multiple sources & serving them to customers',
            'Tech Stacks : Nest.js, Next.js, MongoDB, Redis, GCP, Kubernetes, Argocd, Kafka v...v...',
            'Resource : 12 members',
          ],
        },
        {
          name: 'Container Operation Management',
          position: 'Technical Architect',
          descriptions: [
            'Managing Containers Movement, streaming data from multiple sources & serving them to customers',
            'Tech Stacks : Nest.js, Next.js, MongoDB, Postgres, Redis, GCP, Kubernetes, Argocd, Kafka, Google Map/Stadia Map/AMap APIs, v...v...',
            'Resource : 12 members',
          ],
        },
      ],
    },
    {
      key: 'setel',
      title: 'SETEL',
      period: 'Jul 2021 - Jul 2024',
      position: 'Full-stack Engineer',
      logo: '/images/setel.png',
      descriptions: [
        'Building a super App platforms & system for Petronas in Malaysia',
        'Communicating in English with international teams',
        'Achievement : Got promoted to Technical Architect position after 1 and a half years of working',
      ],
      projectsCssClass: 'sm:h-[360px] md:h-[580px]',
      projects: [
        {
          name: 'Family Wallet members',
          position: 'BE Engineer',
          descriptions: [
            'A feature which allow user to create a family group, other members in the group can use their payment method to purchase',
            'Tech Stacks : Nest.js, MongoDB, Redis v...v...',
            'Resource : 5 members',
            'Period : 6 months',
            'Achievement : The project was highly rated by stalkeholders, for bringing in more customers & contributing to the revenue of the company',
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
            'Achievement : Main responsible for the BE part & integrate with Mobile team, apply CQRS pattern & CDC to achieve high performance, build a Map on Admin Portal',
          ],
        },
        {
          name: 'Deals & Vouchers',
          position: 'Team Leader',
          descriptions: [
            'Managing & Issuing Vouchers for users, allowing them to redeem vouchers from merchant deals',
            'Tech Stacks : Nest.js, MongoDB, AWS S3, Kafka, Pubsub, React.js, Tailwind CSS v...v...',
            'Resource : 5 members',
            'Period : 1 year',
            'Achievement : take over this project from another team, responsible for maintaining & developing new features for this project',
          ],
        },
        {
          name: 'Loyalty points capping',
          position: 'Team Leader',
          descriptions: [
            'A feature to put a cap limit quota for the amount of loyalty that user can earned in 1 month',
            'Tech Stacks : Nest.js, MongoDB, Kafka, v...v...',
            'Resource : 2 members',
            'Period : 5 months',
            'Achievement : Handle a full life cycle of the project, from analysis to release phase, integrate with system of loyalty team',
          ],
        },
        {
          name: 'Setel Lite Web for Guest user',
          position: 'Team Leader',
          descriptions: [
            'A light Web App which allow guest user to have their own loyalty barcode for CDS/POS scanning to earn points, for experience purpose',
            'Tech Stacks : Nest.js, MongoDB, React.js, Tailwind CSS, v...v...',
            'Resource : 2 members',
            'Period : 3 months',
            'Achievement : Handle a full life cycle of the project, from analysis to release phase, build a Web App & handle authentication with reCaptcha & OTP, integrate with BE system of another domain team',
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
        'Communicating in English with co-workers and clients',
        'Achievement : Got promoted to team leader position after 1 year of working, received support from the company to study & take AWS Certified Solutions Architect Associate certificate',
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
            'Achievement : Main responsible for the development of UI/UX part, support with the Design part',
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
            'Achievement : Handle a full life cycle of the project, from analysis to release phase, working with a junior developer, support & training him on the project',
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
            'Achievement : Received a small exclusive performance bonus for 6 months of working, for the contribution to the project',
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
        'Deploy as SPA in AWS S3 + Cloudfront',
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
export type CertificateImage = { name: string; image: string };
export type ExperienceType = (typeof profile.experiences)[0];
export type CertificatesType = (typeof profile.certificates)[0];
