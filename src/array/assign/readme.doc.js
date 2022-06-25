export default (pkg, meta, types) => ({
  title: 'array.assign',
  sections: [
    {
      type: types.SECTION_PARAMS,
      title: 'assign(source, getter[, accumulator = {}])',
      content: [
        {
          type: types.CONTENT_PARAMS,
          items: [
            {
              name: 'source',
              type: 'T[]',
              description: 'array of source data',
              defaultValue: null,
            },
            {
              name: 'getter',
              type: '(item: T, index: number) => {}',
              description: 'function calling on every item. It should return object which will be assigned to accumulator',
              defaultValue: null,
            },
            {
              name: 'accumulator',
              type: 'Record<any, any>',
              description: 'object accumulator',
              defaultValue: '{}',
            },
          ],
        },
      ],
    },
    {
      type: types.SECTION_IMPORT,
      title: 'Import',
      content: [
        {
          type: types.CONTENT_SCRIPT,
          script: {
            type: types.SCRIPT_JS,
            content: `import assign from '${meta.npm.name}/array/assign';`,
          },
        },
      ],
    },
    {
      type: types.SECTION_EXAMPLE,
      title: 'Example',
      content: [
        {
          type: types.CONTENT_SCRIPT,
          script: {
            type: types.SCRIPT_JS,
            content: `
              const array = [
                { name: 'first', value: 1 },
                { name: 'second', value: 2 },
                { name: 'third', value: 3 },
              ];

              const object = assign(
                array,
                item => {
                  const name = '__' + item.name;
                  const value = item.value ** 2;

                  return { [name]: value };
                },
                { startValue: true }
              );
            `,
          },
        },
      ],
    },
    {
      type: types.SECTION_RESULT,
      title: 'Result',
      content: [
        {
          type: types.CONTENT_SCRIPT,
          script: {
            type: types.SCRIPT_JSON,
            content: `
              {
                "startValue": true,
                "__first": 1,
                "__second": 4,
                "__third": 9
              }
            `,
          },
        },
      ],
    },
  ],
});