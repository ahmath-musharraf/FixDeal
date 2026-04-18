import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = 'FIX DEAL - The Future of Buying & Selling in Sri Lanka',
  description = 'The ultimate marketplace in Sri Lanka. Quality, transparency, and convenience in every deal.',
  keywords = 'marketplace, sri lanka, buy, sell, rent, services, fix deal',
  image = 'https://picsum.photos/seed/fixdeal/1200/630',
  url = window.location.href,
  type = 'website'
}) => {
  const siteTitle = title.includes('FIX DEAL') ? title : `${title} | FIX DEAL`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
