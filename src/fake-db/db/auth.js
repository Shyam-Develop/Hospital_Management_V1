import Mock from "../mock";

// const JWT_SECRET = 'jwt_secret_key';
// const JWT_VALIDITY = '7 days';

const userList = [
  {
    id: 1,
    role: "ADMIN",
    name: "Mahendran",
    username: "Mahendran2001",
    email: "safin@gmail.com",
    avatar: "/assets/images/user.jpg",
    company:"Plymouth",
    companyID:23,
    userMobile:"(206) 676-8956",
    phone1:"785-236-7568",
    phone2:"785-236-1526",
    fax: "(206) 622-2625",
    logo:"/assets/images/plylogo.png",
    genFullPrcieBookImg:'/assets/coverimg/plymouthcoverimg.jpg',
    customerFullPriceBookImg:'/assets/coverimg/plymouthcoverimg.jpg',
    customerCustomPriceBookImg:'/assets/coverimg/plymouthcoverimg.jpg'
  },
  {
    id: 2,
    role: "DOCTOR",
    name: "Keerthana",
    username: "Keerthana2001",
    email: "ram@gmail.com",
    avatar: "/assets/images/user2.JPEG",
    userMobile:"(206) 676-8956",
    company:"Plymouth",
    companyID:23,
    phone1:"785-236-7568",
    phone2:"785-236-1526",
    fax: "(206) 622-2625",
    logo:"/assets/images/plylogo.png",
    genFullPrcieBookImg:'/assets/coverimg/plymouthcoverimg.jpg',
    customerFullPriceBookImg:'/assets/coverimg/plymouthcoverimg.jpg',
    customerCustomPriceBookImg:'/assets/coverimg/plymouthcoverimg.jpg'
  },
  {
    id: 3,
    role: "PHARMACY",
    name: "Neelakrishnan",
    username: "nk01",
    email: "neel@gmail.com",
    avatar: "/assets/images/user3.jpg",
    company:"Nicky",
    userMobile:"(206) 676-8956",
    companyID:24,
    phone1:"785-236-7568",
    phone2:"785-236-1526",
    fax: "(206) 622-2625",
    logo:"/assets/images/nicky.png",
    genFullPrcieBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerFullPriceBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerCustomPriceBookImg:'/assets/coverimg/nickycoverimg.jpg'
  },
  {
    id: 4,
    role: "PATIENT",
    name: "Mugesh",
    username: "mugesh01",
    email: "mugesh01@gmail.com",
    avatar: "/assets/images/user4.PNG",
    company:"S & J",
    userMobile:"(206) 676-8956",
    companyID:25,
    phone1:"785-236-7568",
    phone2:"785-236-1526",
    fax: "(206) 622-2625",
    logo:"/assets/images/sjfood.png",
    genFullPrcieBookImg:'/assets/coverimg/sjcoverimg.jpg',
    customerFullPriceBookImg:'/assets/coverimg/sjcoverimg.jpg',
    customerCustomPriceBookImg:'/assets/coverimg/sjcoverimg.jpg'
  },
  {
    id: 5,
    role: "BillingInvoice",
    name: "Mahendran",
    username: "mahe10",
    email: "mahe@gmail.com",
    avatar: "/assets/images/user3.jpg",
    company:"JK",
    userMobile:"(206) 676-8956",
    companyID:25,
    phone1:"785-236-7568",
    phone2:"785-236-1526",
    fax: "(206) 622-2625",
    logo:"/assets/images/nicky.png",
    genFullPrcieBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerFullPriceBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerCustomPriceBookImg:'/assets/coverimg/nickycoverimg.jpg'
  },
  {
    id: 6,
    role: "Pharmacy",
    name: "Kumar",
    username: "kumar03",
    email: "kumar@gmail.com",
    avatar: "/assets/images/user3.jpg",
    company:"KKR",
    userMobile:"(206) 676-8956",
    companyID:26,
    phone1:"785-236-7568",
    phone2:"785-236-1526",
    fax: "(206) 622-2625",
    logo:"/assets/images/nicky.png",
    genFullPrcieBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerFullPriceBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerCustomPriceBookImg:'/assets/coverimg/nickycoverimg.jpg'
  },
  {
    id: 7,
    role: "Lab",
    name: "Mukesh",
    username: "Mukesh09",
    email: "Mukesh@gmail.com",
    avatar: "/assets/images/user3.jpg",
    company:"OPS",
    userMobile:"(206) 676-8956",
    companyID:26,
    phone1:"785-236-7568",
    phone2:"785-236-1526",
    fax: "(206) 622-2625",
    logo:"/assets/images/nicky.png",
    genFullPrcieBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerFullPriceBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerCustomPriceBookImg:'/assets/coverimg/nickycoverimg.jpg'
  },
  {
    id: 8,
    role: "ERecords",
    name: "Sathis",
    username: "Sathis10",
    email: "sathis@gmail.com",
    avatar: "/assets/images/user3.jpg",
    company:"MMS",
    userMobile:"(206) 676-8956",
    companyID:26,
    phone1:"785-236-7568",
    phone2:"785-236-1526",
    fax: "(206) 622-2625",
    logo:"/assets/images/nicky.png",
    genFullPrcieBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerFullPriceBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerCustomPriceBookImg:'/assets/coverimg/nickycoverimg.jpg'
  },
  {
    id: 8,
    role: "UAAM",
    name: "Mani",
    username: "Mani99",
    email: "mani@gmail.com",
    avatar: "/assets/images/user3.jpg",
    company:"RKO",
    userMobile:"(206) 676-8956",
    companyID:26,
    phone1:"785-236-7568",
    phone2:"785-236-1526",
    fax: "(206) 622-2625",
    logo:"/assets/images/nicky.png",
    genFullPrcieBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerFullPriceBookImg:'/assets/coverimg/nickycoverimg.jpg',
    customerCustomPriceBookImg:'/assets/coverimg/nickycoverimg.jpg'
  },
];





Mock.onPost("/api/auth/login").reply(async (config) => {
  try {
    const { email } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (!user) return [400, { message: "Invalid email or password" }];

    const payload = { user: user};
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onPost("/api/auth/register").reply((config) => {
  try {
    const { email, username } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (user) return [400, { message: "User already exists!" }];

    const newUser = {
      id: 2,
      role: "GUEST",
      name: "Unknown",
      age: 25,
      email: email,
      username: username,
      avatar: "/assets/images/face-6.jpg"
    };

    userList.push(newUser);

    const payload = { user: { ...newUser } };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/auth/profile").reply((config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: "Invalid Authorization token" }];
    }

    const payload = { user: userList[0] };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});
