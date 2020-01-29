import { Injectable, HttpService } from '@nestjs/common';
// import axios from 'axios'
import axios,{ AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { NearplaceDto } from './dto/nearplace.dto';
const API_KEY = 'AIzaSyAyxyBXixmv0OVZOqzne7m-NE_HibFwrr0'
@Injectable()
export class NearbyService {
    constructor(private readonly http: HttpService) {}
    async findNearbyPlaces(obj):Promise<NearplaceDto[]>{
        let placeDtoList=[];
        let result=await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${obj.lat},${obj.lng}&radius=${obj.radius}&type=${obj.type}&key=${API_KEY}`)
        const results =result.data
        await results.results.map(place=>{
          const placeDto={
                placeId:place.place_id,
                location:place.geometry.location,
                placeName:place.name,
                // photoReference:place.photos[0].photo_reference,
                photoReference:null,
                type:place.types
            }
            placeDtoList.push(placeDto);
        });

         return placeDtoList;
    }
    async findPlacePhoto(photo_reference):Promise<any>{
       let res = await this.http.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${API_KEY}`).toPromise();
        return res.data;
    }

    async getGooglePlaceDetail(obj):Promise<any>{
        let res = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${obj.place_id}&fields=name,rating,formatted_phone_number,reviews,user_ratings_total&key=${API_KEY}`);
         return res.data.result;
    }
}
