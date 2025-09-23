
import React, { useState, useEffect } from 'react';
import type { Product, Review } from '../types';

interface ProductDetailModalProps {
    product: Product;
    onClose: () => void;
}

const ProductReview: React.FC<{ review: Review }> = ({ review }) => {
    const colors = ['#1E3A8A', '#F97316', '#10b981', '#ef4444', '#3B82F6', '#8b5cf6'];
    const initial = review.name.charAt(0).toUpperCase();
    const colorIndex = review.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    const bgColor = colors[colorIndex];
    
    let reviewStars = Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={`fas fa-star ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
    ));

    return (
        <div className="flex items-start gap-4 border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0">
            <div style={{ backgroundColor: bgColor }} className="w-12 h-12 rounded-full text-white flex-shrink-0 flex items-center justify-center font-bold text-xl">{initial}</div>
            <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <div className="flex items-center text-sm">{reviewStars}</div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
            </div>
        </div>
    );
};

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };
    
    const PriceDisplay: React.FC<{ product: Product }> = ({ product }) => {
        if (product.old_price) {
            const discount = Math.round(((product.old_price - product.price) / product.old_price) * 100);
            return (
                <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-[var(--primary-dark)]">{product.price.toLocaleString()} دج</span>
                    <span className="text-2xl text-gray-400 line-through">{product.old_price.toLocaleString()} دج</span>
                    <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full"><i className="fas fa-tag ml-1"></i>{discount}% تخفيض</span>
                </div>
            );
        }
        return <span className="text-4xl font-extrabold text-[var(--primary-dark)]">{product.price.toLocaleString()} دج</span>;
    };
    
    const RatingDisplay: React.FC<{ rating: number }> = ({ rating }) => {
         let ratingHTML = Array.from({ length: 5 }, (_, i) => {
            if (rating >= i + 1) return <i key={i} className="fas fa-star"></i>;
            if (rating > i && rating < i + 1) return <i key={i} className="fas fa-star-half-alt"></i>;
            return <i key={i} className="far fa-star"></i>;
        });
        return <div className="flex items-center text-lg text-yellow-400">{ratingHTML}</div>;
    };


    return (
        <div 
            onClick={handleBackdropClick}
            className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 md:p-8 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'} bg-slate-800/75 backdrop-blur-sm`}
        >
            <div className={`bg-gray-50 rounded-2xl w-full h-full max-w-6xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                <div className="p-4 flex-shrink-0 border-b border-gray-200 bg-white rounded-t-2xl flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">تفاصيل المنتج</h2>
                    <button onClick={handleClose} className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full text-lg flex items-center justify-center transition-colors">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                        <div className="lg:col-span-3">
                            <div className="mb-4 rounded-xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-100">
                                <img src={mainImage} alt={product.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.slice(0, 4).map((img, index) =>
                                    <img 
                                        key={index} 
                                        src={img} 
                                        alt={`Thumbnail ${index + 1}`} 
                                        className={`aspect-square w-full object-cover rounded-lg cursor-pointer border-2 hover:border-[var(--primary)] transition-all ${mainImage === img ? 'border-[var(--primary)] shadow-md' : 'border-gray-200'}`} 
                                        onClick={() => setMainImage(img)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-2 flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <span className="font-semibold text-[var(--primary-dark)] bg-[var(--primary-lightest)] px-3 py-1 rounded-full self-start mb-2">{product.category}</span>
                            <h1 className="text-3xl font-bold text-[var(--primary-dark)] mb-3">{product.title}</h1>
                            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <RatingDisplay rating={product.rating} />
                                    <span className="font-bold">{product.rating.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center"><i className="fas fa-users ml-2"></i><span>{product.sales.toLocaleString()} عملية شراء</span></div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 my-4 border border-gray-200">
                                <PriceDisplay product={product} />
                            </div>
                            <p className="text-gray-700 leading-relaxed my-4 flex-grow">{product.description}</p>
                            <div className="mt-auto pt-6 border-t-2 border-gray-100">
                                <div className="flex flex-col gap-3">
                                    <button className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white font-bold py-3 px-8 rounded-full text-lg w-full transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[var(--secondary-light)]">
                                        <i className="fas fa-credit-card ml-3"></i>
                                        اشتري الآن
                                    </button>
                                    <button className="btn bg-blue-100 hover:bg-blue-200 text-[var(--primary-dark)] font-bold py-3 px-8 rounded-full text-lg w-full">
                                        <i className="fas fa-shopping-cart ml-3"></i>
                                        أضف إلى السلة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-2xl font-bold text-[var(--primary-dark)] mb-6 flex items-center"><i className="fas fa-comments ml-3 text-[var(--primary)]"></i>التعليقات والتقييمات ({product.reviews.length})</h3>
                        <div>
                            {product.reviews.length > 0 ? (
                                product.reviews.map((review, index) => <ProductReview key={index} review={review} />)
                            ) : (
                                <div className="text-center text-gray-500 py-8 bg-gray-100 rounded-lg"><i className="fas fa-comment-slash text-3xl mb-2 text-gray-400"></i><p>لا توجد تعليقات لهذا المنتج بعد.</p></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
