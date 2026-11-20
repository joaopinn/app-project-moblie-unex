export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  accentColor?: string;
}

export const coursesData: Course[] = [
  {
    id: '1',
    code: '03_SIS6AN - SIS922',
    title: 'Desenvolvimento mobile híbrido',
    instructor: 'Elienaide Machado de Souza Silva',
    accentColor: '#536DFE'
  },
  {
    id: '2',
    code: '2026.2.V1.DWOOSI',
    title: 'Desenvolvimento Web Orientada a Objetos',
    instructor: 'Lucas Almeida Silva',
    accentColor: '#AEEA00'
  }
];