module {
  type ProfessorProfile = {
    name : Text;
    title : Text;
    department : Text;
    institution : Text;
    location : Text;
    bio : Text;
  };

  type ContactInfo = {
    email : Text;
    address : Text;
    externalLinks : [Text];
  };

  type OldActor = {
    professorProfile : ProfessorProfile;
    contactInfo : ContactInfo;
  };

  type NewActor = {
    maintenanceMode : Bool;
    currentProfile : ProfessorProfile;
    currentContact : ContactInfo;
  };

  public func run(old : OldActor) : NewActor {
    {
      maintenanceMode = false;
      currentProfile = old.professorProfile;
      currentContact = old.contactInfo;
    };
  };
};
