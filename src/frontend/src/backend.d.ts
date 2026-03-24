import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProfessorProfile {
    bio: string;
    title: string;
    institution: string;
    name: string;
    department: string;
    location: string;
}
export interface Publication {
    title: string;
    link: string;
    year: bigint;
    publication: string;
}
export interface ContactInfo {
    externalLinks: Array<string>;
    email: string;
    address: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface Student {
    status: string;
    topic: string;
    name: string;
    degreeType: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addOrUpdateStudent(student: Student): Promise<void>;
    addResearchInterest(interest: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<ContactInfo>;
    getProfessorProfile(): Promise<ProfessorProfile>;
    getPublications(): Promise<Array<Publication>>;
    getResearchInterests(): Promise<Array<string>>;
    getStudents(status: string): Promise<Array<Student>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeData(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isMaintenanceMode(): Promise<boolean>;
    removePublication(title: string): Promise<void>;
    removeResearchInterest(interest: string): Promise<void>;
    removeStudent(name: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setMaintenanceMode(mode: boolean): Promise<void>;
    updateContactInfo(info: ContactInfo): Promise<void>;
    updateProfessorProfile(profile: ProfessorProfile): Promise<void>;
    updatePublication(publication: Publication): Promise<void>;
}
