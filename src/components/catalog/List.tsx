'use client';
import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

function CatalogList() {
  // TODO: مقداردهی داینامیک به images
  const images: any[] = [];
  return (
    <div className="flex flex-wrap justify-center mb-4">
      {images?.map((_image: any, index) => {
        return (
          <div className="p-1" key={index}>
            <Card>
              <CardContent className="flex w-[400px] h-[400px] items-center justify-center p-6">
                <Image
                  src={_image?.image}
                  alt="gallery"
                  width={400}
                  height={400}
                  className="hover:scale-105 transform transition-transform duration-300"
                />
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default CatalogList;
