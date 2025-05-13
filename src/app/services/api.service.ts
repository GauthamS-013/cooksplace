import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url="http://localhost:3000"

  setUpHeader(){
    const token=sessionStorage.getItem('token')
    let header=new HttpHeaders()
    header=header.append("Authorization",`Token ${token}`)
    return header
  }

  constructor(private http:HttpClient) { }

  getAllRecipeApi(){
    return this.http.get(`${this.base_url}/user/recipes`)
  }

  getRecipeWithIdApi(id:any){
    return this.http.get(`${this.base_url}/user/recipe/${id}`,{headers:this.setUpHeader()})
  }

  userRegisterApi(data:any){
    return this.http.post(`${this.base_url}/register`,data)
  }
  userLoginApi(data:any){
    return this.http.post(`${this.base_url}/login`,data)
  }

  addTestimonyApi(data:any){
    return this.http.post(`${this.base_url}/user/addtest`,data)
  }

  saveRecipeApi(data:any){
    return this.http.post(`${this.base_url}/user/saverecipe`,data,{headers:this.setUpHeader()})
  }

  getSavedRecipeApi(){
    return this.http.get(`${this.base_url}/user/getsavedrecipe`,{headers:this.setUpHeader()})
  }

  removeSavedRecipeApi(srid:any){
    return this.http.delete(`${this.base_url}/user/removesavedrecipe/${srid}`,{headers:this.setUpHeader()})
  }

  addDownloadCountApi(data:any){
    return this.http.post(`${this.base_url}/user/downloadcount`,data,{headers:this.setUpHeader()})
  }

  getDownloadCountApi(id:any){
    return this.http.get(`${this.base_url}/user/getdownloadcount/${id}`,{headers:this.setUpHeader()})
  }

  getApprovedTestimoniesApi(){
    return this.http.get(`${this.base_url}/user/gettest`)
  }


  getAllUsersApi(){
    return this.http.get(`${this.base_url}/admin/users`,{headers:this.setUpHeader()})
  }

  getAllDownloadsApi(){
    return this.http.get(`${this.base_url}/admin/downloads`,{headers:this.setUpHeader()})
  }

  getAllTestimoniesApi(){
    return this.http.get(`${this.base_url}/admin/testimonies`,{headers:this.setUpHeader()})
  }

  updateTestimonyApi(id:any,data:any){
    return this.http.patch(`${this.base_url}/admin/updatetestimony/${id}`,data,{headers:this.setUpHeader()})
  }

  addRecipeApi(data:any){
    return this.http.post(`${this.base_url}/admin/addrecipe`,data,{headers:this.setUpHeader()})
  }

  deleteRecipeApi(id:any){
    return this.http.delete(`${this.base_url}/admin/deleterecipe/${id}`,{headers:this.setUpHeader()})
  }

  updateRecipeApi(id:any,data:any){
    return this.http.put(`${this.base_url}/admin/editrecipe/${id}`,data,{headers:this.setUpHeader()})
  }

}
