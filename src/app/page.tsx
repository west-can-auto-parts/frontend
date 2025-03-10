import Image from "next/image";


import HeroSection from '@/app/_components/HeroSection'
import PopularCategories from '@/app/_components/PopularCategories'
import FeaturedProducts from '@/app/_components/FeaturedProducts'
import CurrentDeals from '@/app/_components/CurrentDeals'
import LatestNews from "@/app/_components/LatestNews";
import OtherOffers from '@/app/_components/OtherOffers'
import StoreLocations from '@/app/_components/StoreLocations'
import {GoogleReviews} from '@/components/google-reviews'
export default function Home() {
  return (
    <main>
      <HeroSection/>
      <FeaturedProducts/>
      {/* <CurrentDeals/> */}
      <PopularCategories/>
      <StoreLocations/>
      <OtherOffers/>
      <LatestNews/>
      <GoogleReviews placeId = "ChIJI7ic-HfZhVQR4jC5mgbhbcU" apiKey = "AIzaSyAKHCd4g-ut7Z-a82YeR8Ipvc1-5vTxnTg" />
    </main>
  );
}
