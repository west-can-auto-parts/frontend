import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async (req, res) => {
  try {
    // Fetch all three API responses
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJI7ic-HfZhVQR4jC5mgbhbcU&fields=reviews&key=AIzaSyAKHCd4g-ut7Z-a82YeR8Ipvc1-5vTxnTg`
    );
    const response2 = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJXZVYH0V2hlQRwqIES3MCCW8&fields=reviews&key=AIzaSyAKHCd4g-ut7Z-a82YeR8Ipvc1-5vTxnTg`
    );
    const response3 = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJWwgPaQR1hlQR-tVqwNPYGd0&fields=reviews&key=AIzaSyAKHCd4g-ut7Z-a82YeR8Ipvc1-5vTxnTg`
    );
    const response4 = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJx3GbAQ54hlQRWU30sDuRUYc&fields=reviews&key=AIzaSyAKHCd4g-ut7Z-a82YeR8Ipvc1-5vTxnTg`
    );
    const response5 = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJJZigK8F3hlQRJ_cidF9CiO8&fields=reviews&key=AIzaSyAKHCd4g-ut7Z-a82YeR8Ipvc1-5vTxnTg`
    )


    // Extract reviews from each response
    const data = response.data.result.reviews || [];
    const data2 = response2.data.result.reviews || [];
    const data3 = response3.data.result.reviews || [];
    const data4 = response4.data.result.reviews || [];
    const data5 = response5.data.result.reviews || []


    // Combine all reviews into a single array
    const combinedReviews = [...data, ...data2, ...data3, ...data4, ...data5];

    // Return the combined reviews as JSON
    return NextResponse.json({ combinedReviews }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error fetching reviews' }, { status: 500 });
  }
};
