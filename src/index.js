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
 
 
 function convertSort(orderBy){
     if (orderBy){
         let [name, dir] = orderBy.split(' ');
         return {[name]: dir};
     }
 }
 
 
 function convertParams({limit, offset, orderBy, where}){
     return {
         limit,
         offset,
         where: convertFilter(where, format),
         order_by: convertSort(orderBy)
     };
 }
 
 
 export function hasura(){
     return [
         params(convertParams)
     ];
 }
 