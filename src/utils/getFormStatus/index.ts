type IFile = {
  originalname?: string;
  awsFileName?: string;
  fileLink?: string;
  name?: string;
};

export const calcDirtyFields = (data: {
  [key: string]:
    | string
    | IFile
    | string[]
    | {
        originalname: string;
        awsFileName: string;
        fileLink: string;
      };
}) => {
  let count = 0;

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (typeof value === "string") {
      count += 1;
    } else if (Array.isArray(value)) {
      // Handle the case where the value is an array of strings if needed
    } else if (
      typeof value === "object" &&
      value !== null &&
      "fileLink" in value
    ) {
      count += 1;
    }
  });

  return count;
};
