import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import { ImageListType } from "react-images-uploading";

interface FormImageUploadProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

const FormImageUpload = ({
  name,
  label,
  required,
  className,
}: FormImageUploadProps) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setValue(name, imageList[0]?.file);
    setImages(imageList as never[]);
  };

  return (
    <>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="">
            {imageList?.length === 0 ? (
              <>
                <div
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  className="upload__image-dropzone w-full h-32 border-dashed border-spacing-72 border border-black flex justify-center items-center rounded-2xl"
                >
                  Click or Drop here
                </div>
              </>
            ) : null}
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>x</button> */}
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <div className="avatar my-5">
                  <div className={cn("w-24 rounded-full", className)}>
                    {field.value && imageList.length === 0 && (
                      <Image
                        src={field.value}
                        alt={name}
                        // layout="responsive"
                        width={100}
                        height={100}
                      />
                    )}
                    {imageList.map((image, index) => (
                      <>
                        <button
                          onClick={() => onImageRemove(index)}
                          className="absolute top-0 right-0"
                        >
                          X
                        </button>
                        <Image
                          key={index}
                          src={image["data_url"]}
                          alt={name}
                          // layout="responsive"
                          width={100}
                          height={100}
                        />
                      </>
                    ))}
                  </div>
                </div>
              )}
            />
            {/* {imageList.map((image, index) => (
              <div key={index} className="image-item relative">
                <div className="avatar">
                  <button
                    onClick={() => onImageRemove(index)}
                    className="absolute top-0 right-0"
                  >
                    X
                  </button>
                  <div className="w-24 rounded-full">
                    <Image
                      src={image["data_url"]}
                      alt={name}
                      // layout="responsive"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                </div>
              </div>
            ))} */}
          </div>
        )}
      </ImageUploading>
    </>
  );
};

export default FormImageUpload;
