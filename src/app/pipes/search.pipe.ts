import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(recipeList: any[], searchKey: string): any[] {
    let result:any[]

    if(!recipeList || searchKey==""){
      return recipeList
    }
    result=recipeList.filter((item:any)=>item.name.toLowerCase().includes(searchKey.toLowerCase()))
    return result
  }

}
