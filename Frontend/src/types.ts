export interface Branding {
    id: number;
    name: string;
    role: string;
    email: string;
    location: string;
    resumePath: string;
}

export interface Social {
    id: number;
    social_id: string;
    label: string;
    url: string;
}

export interface Hero {
    id: number;
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primaryActionLabel: string;
    primaryActionTo: string;
    secondaryActionLabel: string;
    secondaryActionTo: string;
    aiSummary: string;
    stats: HeroStat[];
}

export interface HeroStat {
    id: number;
    label: string;
    value: string;
    suffix: string;
}

export interface Skill {
    id: number;
    name: string;
    highlight?: string;
}

export interface SkillCategory {
    id: string;
    label: string;
    icon: string;
    summary: string;
    skills: Skill[];
}

export interface Project {
    id: number;
    slug: string;
    title: string;
    category: string;
    summary: string;
    description: string;
    image: string;
    demo?: string;
    repo?: string;
    tags: string[];
}

export interface Achievement {
    id: number;
    title: string;
    issuer: string;
    year: string;
    category: string;
    summary: string;
    badgeImage: string;
    credentialUrl?: string;
}

export interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
    summary: string;
    achievements: string[];
    link?: string;
}

export interface About {
    headline: string;
    intro: string;
    profile: {
        tag: string;
        heading: string;
        summary: string;
        ending: string;
    };
    tiles: {
        title: string;
        description: string;
    }[];
    experience: Experience[];
    values: {
        title: string;
        description: string;
    }[];
}

export interface Gallery {
    profile: {
        name: string;
        image: string;
        tagline: string;
        highlight: string;
        cta: string;
    };
    carousel: {
        id: string;
        type: 'image' | 'video';
        src: string;
        title?: string;
        description?: string;
    }[];
    images: {
        id: string;
        src: string;
        alt: string;
        width: number;
        height: number;
        location?: string;
        title?: string;
        description?: string;
        capturedAt?: string;
    }[];
}

export interface Blog {
    id: number;
    slug: string;
    title: string;
    summary: string;
    content: string;
    image: string;
    date: string;
    tags: string[];
    author: string;
}

export interface SiteContent {
    branding: Branding;
    socials: Social[];
    hero: Hero;
    skills: {
        categories: SkillCategory[];
    };
    projects: {
        featured: Project[];
    };
    achievements: {
        certifications: Achievement[];
    };
    blogs: Blog[];
    about: About;
    gallery: Gallery;
    logoLoop: {
        id: number;
        name: string;
        logo: string;
    }[];
}
