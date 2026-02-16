export interface Project {
  id: number;
  title: string;
  category: string; // 'websites', 'automacoes', 'sistemas'
  subtitle: string;
  image: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  title: string;
}
