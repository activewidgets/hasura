/**
 * Copyright (c) ActiveWidgets SARL. All Rights Reserved.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import { params, convertFilter } from "@activewidgets/options";

 let ops = {
     '=': '_eq',
     '>': '_gt',
     '<': '_lt',
     '>=': '_gte',
     '<=': '_lte'
 };
 
 let format = {
     compare: (path, op, value) => ({
         [path[0]]: path.length > 1 ? format.compare(path.slice(1), op, value) : {[ops[op]]: value}
     })
 }
 
 
 function convertSort(sort){
     if (sort){
         let [name, dir] = sort.split(' ');
         return {[name]: dir};
     }
 }
 
 
 function convertParams({limit, offset, sort, filter}){
     return {
         limit,
         offset,
         where: convertFilter(filter, format),
         order_by: convertSort(sort)
     };
 }
 
 
 export function hasura(){
     return [
         params(convertParams)
     ];
 }
 