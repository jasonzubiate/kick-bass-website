type ContentfulImage = {
  metadata: {
    tags: string[];
  };
  sys: {
    space: any;
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: any;
    revision: number;
    locale: string;
  };
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
};

export type CoachesCopy = {
  header: string;
  paragraph: string;
};

export type TutorialsCopy = {
  paragraph: string;
};

type Label = {
  link: string;
  name: string;
};

type Social = {
  link: string;
  name: string;
};

export interface CoachFields {
  title: string;
  slug: string;
  category: string;
  image: ContentfulImage;
  bio: string;
  spotifyUrl: string;
  labels?: Label[];
  socials?: Social[];
}

export type Tutorial = {
  id: string;
  name: string;
  coach: string;
  video: any;
};
