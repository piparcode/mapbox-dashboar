export default interface Mapa {
    id: number;
    attributes: {
      title: string;
      description: string;
      lat: string;
      long: string;
      links: JSON;
      image: {
        data: {
          attributes: {
            url: string;
          }
        }
      }
      date: string;
      city: string;
      slug: string;
    };
  }