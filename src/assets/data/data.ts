export const ridersData = [
    {
      id: 1,
      name: "Alexandra Della",
      avatar:
        "https://ui-avatars.com/api/?name=Alexandra+Della&background=random",
      status: "pending",
    },
    {
      id: 2,
      name: "Green Cute",
      avatar: "https://ui-avatars.com/api/?name=Green+Cute&background=random",
      status: "approved",
    },
    {
      id: 3,
      name: "Marianne Audrey",
      avatar:
        "https://ui-avatars.com/api/?name=Marianne+Audrey&background=random",
      status: "declined",
    },
    {
      id: 4,
      name: "Holland Scott",
      avatar:
        "https://ui-avatars.com/api/?name=Holland+Scott&background=random",
      status: "approved",
    },
  ];

// MerchantsProductUpdate

export const merchantUpdates = [
    {
      id: 1,
      name: "Rudolf Kobbe JBL",
      image: "https://ui-avatars.com/api/?name=Rudolf+Kobbe&background=random",
      pending: "5 Pending",
    },
    {
      id: 2,
      name: "Smart Quincy",
      image: "https://ui-avatars.com/api/?name=Smart+Quincy&background=random",
      pending: "7 Pending",
    },
    {
      id: 3,
      name: "Kwintilia Budii",
      image:
        "https://ui-avatars.com/api/?name=Kwintilia+Budii&background=random",
      pending: "6 Pending",
    },
    {
      id: 4,
      name: "Felicia Projeremyt",
      image:
        "https://ui-avatars.com/api/?name=Felicia+Projeremyt&background=random",
      pending: "4 Pending",
    },
    {
      id: 5,
      name: "Derrick Canon",
      image: "https://ui-avatars.com/api/?name=Derrick+Canon&background=random",
      pending: "5 Pending",
    },
  ];


  // promotionsData
  export const promotionsData = [
    {
      id: 1,
      merchant: "Archie Cantones",
      email: "arcie.tones@gmail.com",
      avatar:
        "https://ui-avatars.com/api/?name=Archie+Cantones&background=random",
      promo: "100%",
      date: "11/06/2023 10:53",
      status: "declined",
    },
    {
      id: 2,
      merchant: "Holmes Cherryman",
      email: "golms.chan@gmail.com",
      avatar:
        "https://ui-avatars.com/api/?name=Holmes+Cherryman&background=random",
      promo: "14%",
      date: "11/06/2023 10:53",
      status: "in-progress",
    },
    {
      id: 3,
      merchant: "Malanie Hanvey",
      email: "lanie.nveyn@gmail.com",
      avatar:
        "https://ui-avatars.com/api/?name=Malanie+Hanvey&background=random",
      promo: "12%",
      date: "11/06/2023 10:53",
      status: "draft",
    },
    {
      id: 4,
      merchant: "Kenneth Hune",
      email: "nneth.une@gmail.com",
      avatar: "https://ui-avatars.com/api/?name=Kenneth+Hune&background=random",
      promo: "8%",
      date: "11/06/2023 10:53",
      status: "declined",
    },
    {
      id: 5,
      merchant: "Valentine Maton",
      email: "alenine.aton@gmail.com",
      avatar:
        "https://ui-avatars.com/api/?name=Valentine+Maton&background=random",
      promo: "30%",
      date: "11/06/2023 10:53",
      status: "approved",
    },
  ];
  

// approvedProducts
    export const approvedProducts = [
    {
      id: 1,
      merchant: "Archie Cantones",
      pending: 10,
      lastUpdated: "11/06/2023 10:53",
    },
    {
      id: 2,
      merchant: "Holmes Cherryman",
      pending: 14,
      lastUpdated: "11/06/2023 10:53",
    },
    {
      id: 3,
      merchant: "Malanie Hanvey",
      pending: 12,
      lastUpdated: "11/06/2023 10:53",
    },
    {
      id: 4,
      merchant: "Kenneth Hune",
      pending: 8,
      lastUpdated: "11/06/2023 10:53",
    },
    {
      id: 5,
      merchant: "Valentine Maton",
      pending: 30,
      lastUpdated: "11/06/2023 10:53",
    },
  ];

  
  export const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "declined":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
