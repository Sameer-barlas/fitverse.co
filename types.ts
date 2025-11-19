export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other'
  }
  
  export interface MedicalHistory {
    heartIssue: boolean;
    diabetes: boolean;
    asthma: boolean;
    injury: boolean;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    age: number;
    gender: Gender;
    height: number; // in meters
    weight: number; // in kg
    medical: MedicalHistory;
    isAdmin?: boolean;
  }
  
  export interface Exercise {
    id: string;
    title: string;
    reps: string;
    sets: number;
    imageUrl: string;
    category: 'strength' | 'cardio' | 'flexibility' | 'balance';
    intensity: 'low' | 'medium' | 'high';
    description: string;
  }
  
  export interface WorkoutPlan {
    id: string;
    bmiCategory: string;
    bmiValue: number;
    description: string;
    exercises: Exercise[];
    advice: string[];
  }
  
  export interface BMIData {
    value: number;
    category: string;
    color: string;
  }