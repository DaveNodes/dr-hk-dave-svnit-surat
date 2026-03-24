import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // Application Types
  type Publication = {
    title : Text;
    publication : Text;
    year : Nat;
    link : Text;
  };

  module Publication {
    public func compare(p1 : Publication, p2 : Publication) : Order.Order {
      switch (Text.compare(p1.publication, p2.publication)) {
        case (#equal) { Text.compare(p1.title, p2.title) };
        case (order) { order };
      };
    };
  };

  type ProfessorProfile = {
    name : Text;
    title : Text;
    department : Text;
    institution : Text;
    location : Text;
    bio : Text;
  };

  type Student = {
    name : Text;
    degreeType : Text;
    topic : Text;
    status : Text;
  };

  type ContactInfo = {
    email : Text;
    address : Text;
    externalLinks : [Text];
  };

  var maintenanceMode = false;

  let researchInterests = Map.empty<Text, ()>();
  let students = Map.empty<Text, Student>();
  let publications = Map.empty<Text, Publication>();

  var currentProfile : ProfessorProfile = {
    name = "Dr. Harshit K. Dave";
    title = "Professor";
    department = "Department of Mechanical Engineering";
    institution = "S. V. National Institute of Technology (SVNIT), Surat";
    location = "Surat - 395007, Gujarat, India";
    bio = "Dr. Harshit K. Dave is a Professor in the Department of Mechanical Engineering at S.V. National Institute of Technology (SVNIT), Surat. His research spans additive manufacturing, 3D printing, unconventional machining processes, micro machining, and robotics & automation.";
  };

  var currentContact : ContactInfo = {
    email = "hkdave@med.svnit.ac.in";
    address = "Department of Mechanical Engineering, S. V. National Institute of Technology, Surat - 395007, Gujarat, India";
    externalLinks = [
      "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
      "https://www.scopus.com/authid/detail.uri?authorId=36241161900",
      "https://orcid.org/0000-0003-0970-4373",
      "https://www.linkedin.com/in/dr-harshit-dave-8b332b29/",
      "https://www.researchgate.net/profile/Harshit_Dave"
    ];
  };

  // Public queries
  public query func getPublications() : async [Publication] {
    publications.values().toArray().sort();
  };

  public query func getProfessorProfile() : async ProfessorProfile {
    currentProfile;
  };

  public query func getResearchInterests() : async [Text] {
    researchInterests.keys().toArray();
  };

  public query func getStudents(status : Text) : async [Student] {
    students.values().toArray().filter(
      func(student) { student.status == status }
    );
  };

  public query func getContactInfo() : async ContactInfo {
    currentContact;
  };

  public query func isMaintenanceMode() : async Bool {
    maintenanceMode;
  };

  // Write operations (called from authenticated admin frontend)
  public shared func updatePublication(publication : Publication) : async () {
    publications.add(publication.title, publication);
  };

  public shared func removePublication(title : Text) : async () {
    publications.remove(title);
  };

  public shared func addResearchInterest(interest : Text) : async () {
    if (not researchInterests.containsKey(interest)) {
      researchInterests.add(interest, ());
    };
  };

  public shared func removeResearchInterest(interest : Text) : async () {
    researchInterests.remove(interest);
  };

  public shared func addOrUpdateStudent(student : Student) : async () {
    students.add(student.name, student);
  };

  public shared func removeStudent(name : Text) : async () {
    students.remove(name);
  };

  public shared func setMaintenanceMode(mode : Bool) : async () {
    maintenanceMode := mode;
  };

  public shared func updateProfessorProfile(profile : ProfessorProfile) : async () {
    currentProfile := profile;
  };

  public shared func updateContactInfo(info : ContactInfo) : async () {
    currentContact := info;
  };

  public shared func initializeData() : async () {
    if (researchInterests.size() == 0) {
      researchInterests.add("Additive Manufacturing Processes", ());
      researchInterests.add("3D printing filaments & raw materials", ());
      researchInterests.add("Composite polymer extrusion", ());
      researchInterests.add("Clay and concrete 3D printing", ());
      researchInterests.add("Unconventional Machining processes", ());
      researchInterests.add("Micro machining processes", ());
      researchInterests.add("Modeling & optimization of machining processes", ());
      researchInterests.add("Robotics & Automation", ());
    };
  };
};
