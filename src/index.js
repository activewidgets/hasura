/**
 * Copyright (c) ActiveWidgets SARL. All Rights Reserved.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { params, convertSort, convertFilter } from "@activewidgets/options";

const operators = {

    /* equality */
    '=': '_eq',
    '<>': '_neq',
    '!=': '_neq',

    /* comparison */
    '<': '_lt',
    '>': '_gt',
    '<=': '_lte',
    '>=': '_gte',

    /* text */
    'LIKE': '_like',
    'ILIKE': '_ilike',

    /* logical */
    'NOT': '_not',
    'AND': '_and',
    'OR': '_or'
};

const formatting = {
    equality: (name, operator, value) => ({[name]: {[operator]: value}}),
    comparison: (name, operator, value) => ({[name]: {[operator]: value}}),
    text: (name, operator, pattern) => ({[name]: {[operator]: pattern}}),
    logical: (operator, expression) => ({[operator]: expression})
};

function nested(name, value){
    return {[name]: value};
}
 
function sortExpr(name, direction){
    return {[name]: direction};
}

function mergeAll(items){
    return items.length === 1 ? items[0] : items;
}

function convertParams({where, orderBy, limit, offset}){
    return {
        where: convertFilter(where, operators, formatting, nested),
        order_by: convertSort(orderBy, sortExpr, mergeAll, nested),
        limit,
        offset
    };
 }
 
 
 export function hasura(){
     return [
         params(convertParams)
     ];
 }
 