import { useQuery } from "@tanstack/react-query";
import type {
  ContactInfo,
  ProfessorProfile,
  Publication,
  Student,
} from "../backend.d";
import { useActor } from "./useActor";

export function useProfessorProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<ProfessorProfile>({
    queryKey: ["professorProfile"],
    queryFn: async () => {
      if (!actor) {
        return {
          name: "Dr. Harshit K. Dave",
          title: "Professor",
          department: "Department of Mechanical Engineering",
          institution: "S. V. National Institute of Technology (SVNIT), Surat",
          location: "Surat - 395007, Gujarat, India",
          bio: "Dr. Harshit K. Dave is a distinguished Professor in the Department of Mechanical Engineering at SVNIT Surat with extensive research experience in Additive Manufacturing, 3D printing, and Unconventional Machining processes.",
        };
      }
      return actor.getProfessorProfile();
    },
    enabled: !isFetching,
  });
}

export function useResearchInterests() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<string>>({
    queryKey: ["researchInterests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getResearchInterests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePublications() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<Publication>>({
    queryKey: ["publications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStudents(status: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Array<Student>>({
    queryKey: ["students", status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudents(status);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContactInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactInfo>({
    queryKey: ["contactInfo"],
    queryFn: async () => {
      if (!actor) {
        return {
          email: "hkdave@med.svnit.ac.in",
          address:
            "Department of Mechanical Engineering, S.V. National Institute of Technology, Surat - 395007, Gujarat, India",
          externalLinks: [
            "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
            "https://www.scopus.com/authid/detail.uri?authorId=36241161900",
            "https://orcid.org/0000-0003-0970-4373",
            "https://www.linkedin.com/in/dr-harshit-dave-8b332b29/",
            "https://www.researchgate.net/profile/Harshit_Dave",
          ],
        };
      }
      return actor.getContactInfo();
    },
    enabled: !isFetching,
  });
}
