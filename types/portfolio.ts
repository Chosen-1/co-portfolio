export type Experience = {
  id: string;
  position: string;
  facility: string;
  department: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  qualification: string;
  startYear: string;
  endYear: string;
  description: string;
  certificate?: StoredFile;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export type Certification = {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  certificate?: StoredFile;
};

export type Achievement = {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  evidence?: StoredFile;
};

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  image: string;
};

export type StoredFile = {
  name: string;
  type: string;
  data: string;
};

export type PortfolioData = {
  username: string;

  profile: {
    fullName: string;
    professionalTitle: string;
    location: string;
    email: string;
    phone: string;
    profilePhoto: string;
  };

  about: string;

  experiences: Experience[];

  education: Education[];

  skills: Skill[];

  certifications: Certification[];

  achievements: Achievement[];

  gallery: GalleryItem[];

  documents: {
    cv?: StoredFile;
    other: StoredFile[];
  };
};