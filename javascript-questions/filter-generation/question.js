/**
You will use data that we use in production. You will need to generate unique filters from a list of data.

Data list format:
[
  {
    "_id":"5a6771db8393c714a22cfd93",
    "text":"sleeveless jacket",
    "metadata":
      {
        "created_by":"5a217e6b166ffe2c4a99667b"
      },
    "revision":"new",
    "status":"PENDING",
    "annotations":[
      {
        "value":"SLEEVELESS",
        "type":"ATTRIBUTE",
        "name":"SLEEVE_TYPE"
      },
      {
        "type":"CATEGORY",
        "name":"JACKET"
      }
    ]
  },
  {
    "_id":"5a6771db8393c714a22cfd86",
    "text":"jacket",
    "metadata":{
      "created_by":"5a217e6b166ffe2c4aAAAAAA"
    },
    "revision":"new",
    "status":"APPROVED",
    "annotations":[
      {
        "value":"COTTON",
        "type":"ATTRIBUTE",
        "name":"MATERIAL"
      },
      {
        "type":"CATEGORY",
        "name":"JACKET"
      }
    ]
  }
]

Expected output:
{
  "attribute":[
    "MATERIAL:COTTON",
    "SLEEVE_TYPE:SLEEVELESS"
  ],
  "category":[
    "JACKET"
  ],
  "status":[
    "APPROVED",
    "PENDING"
  ],
  "creator":[
    {
      "value":"5a217e6b166ffe2c4a99667b"
    },
    {
      "value":"5a217e6b166ffe2c4aAAAAAA"
    }
  ]
}

Requirements
- The `attribute` and `category` values will need to be pulled out of the `annotations` field value and aggregated based on `type`
- All lists (`attribute`, `category`, `status` and `creator`) should be unique with no falsey values.
- `attribute`, `category` and `status` should be sorted alphabetically.
- Try to get it running as fast as possible while using ES6 features and syntax.
- Avoid using for, forEach, for...in or for...of (There are close to 12K entries).
- The example data above is a simplified schema, the one you will be using will have many other fields.
- Run the file using `node question.js` in your terminal and you will see the output.
- You can alternatively have the result saved to a JSON file named `result.json`.
- You can find the expected output in ./data/result-full.js
*/

/**
 * Answer
 */
const data = require('./data/queries.json');
// const data = require('./data/test-queries.json');
const { attribute } = require('./data/result-full');
const filters = {
    'attribute' : [], 
    'category' : [], 
    'status' : [], 
    'creator' : [],
};


/**
 * Removes duplicate and sorts alphabetically
 * 
 * @param {data} 
 */
const sortAndFilter = data => {

  Object.keys(data).forEach(key => {
    data[key] = [...new Set(data[key])].sort();
  })

  return data;
};


/**
 * Keeps only attribute, category, status, creator info from data
 * 
 * @param {data} 
 */
const getFieldsValues = data => {
  const reduced =  data.reduce((filteredData, item ) => {
    let [ attribute, category, status, creator ] = [ [], '', '', {} ];

    // get attribute and category
    item['annotations'].map(annotation => {
      if (annotation['type'] === 'ATTRIBUTE' && annotation['value']) {
        attribute.push(annotation['name'] + ':' + annotation['value']);
      } else if (annotation['type'] === 'CATEGORY' && annotation['name']) {
        category = annotation['name'];
      }
    });

    // set creator
    if (item['metadata']['created_by']) {
      creator['value'] = item['metadata']['created_by'];
      filteredData['creator'].push(creator);
    }

    // set status
    if (item['status']) {
      status = item['status'];
    }

    // set attribute, category and status
    filteredData['attribute'].push(...attribute);
    filteredData['category'].push(category);
    filteredData['status'].push(status);

    return filteredData;
  }, filters);

  return reduced;
};


/**
 * Returns an object of filters, each filter contains an array of possible values
 * 
 * @param {data} 
 */
const getFilters = data => {
  const fieldsValues = getFieldsValues(data);
  const filters = sortAndFilter(fieldsValues);
  
  return filters;
};

console.log(getFilters(data));