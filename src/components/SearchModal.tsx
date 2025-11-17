"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { products } from "@/data/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 검색 모달 */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
        {/* 검색 입력 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="flex-1 text-lg outline-none"
              placeholder="제품 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="overflow-y-auto max-h-[calc(80vh-100px)] p-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-600">검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProducts.map(product => (
                <a
                  key={product.id}
                  href={product.url}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                  onClick={onClose}
                >
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden relative flex-shrink-0 border border-gray-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-orange-600 font-bold">{product.price}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

