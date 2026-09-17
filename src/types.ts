export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
