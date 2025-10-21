export type ICourseDT = {
    id: number;
    title: string;
    author_img?: string;
    author_name: string;
    thumbnail: string;
    category: string;
    price: number;
    avg_rating: number;
    discount: number;
    lessons: number;
    students: number;
    total_rating: number;
    language: string;
    progress?: number;
    slug?: string;
    description?: string;
    duration?: string;
    examPattern?: string;
    fees?: string;
    eligibility?: string;
    certifications?: string;
    isLiveCourse?: boolean;
    installmentOptions?: {
        months: number;
        amount: number;
        label?: string;
        discount?: number;
    }[];
}