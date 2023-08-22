interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface Geopoint {
  _type: "geopoint";
  lng: string;
  lat: string;
  alt: string;
}

export interface Tent extends SanityBody {
  _type: "tent";
  title: string;
  location: Geopoint;
  mainImage: Image;
  description: string;
  rating: number;
  capacity: number;
}
