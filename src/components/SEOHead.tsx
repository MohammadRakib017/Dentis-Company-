import { useEffect } from 'react';

export default function SEOHead() {
  useEffect(() => {
    // Set Document Title
    document.title = 'Dentis Company | Premium, Family & Cosmetic Dentistry';

    // Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'Dentis Company provides world-class family, cosmetic, and emergency dental care using state-of-the-art technology. Schedule your personal consultation today!'
    );

    // Create or Update Open Graph tags
    const ogTags = {
      'og:title': 'Dentis Company | Premium & Family Dentistry',
      'og:description': 'Experience pain-free dental treatments, advanced porcelain veneers, implants, and 24/7 emergency care in a comfortable, modern environment.',
      'og:type': 'website',
      'og:url': window.location.href,
      'og:image': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200&h=630',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    });

    // Create or Update Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Dentis Company | Premium & Family Dentistry',
      'twitter:description': 'Experience state-of-the-art restorative, cosmetic, and preventative dental care at Dentis Company.',
      'twitter:image': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200&h=630',
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    });

    // Inject Schema.org JSON-LD
    const schemaId = 'dentis-company-schema';
    let schemaScript = document.getElementById(schemaId) as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Dentist',
          '@id': 'https://dentiscompany.example.com/#dentist',
          'name': 'Dentis Company',
          'description': 'Premium dental clinic providing general, cosmetic, orthodontic, and emergency dentistry services.',
          'telephone': '(555) 123-4567',
          'email': 'care@dentiscompany.example.com',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '456 Healthcare Blvd, Suite 100',
            'addressLocality': 'Metropolis',
            'addressRegion': 'NY',
            'postalCode': '10001',
            'addressCountry': 'US'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 40.7128,
            'longitude': -74.0060
          },
          'url': window.location.href,
          'logo': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=300&h=300',
          'image': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200&h=630',
          'priceRange': '$$',
          'openingHoursSpecification': [
            {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              'opens': '08:00',
              'closes': '19:00'
            },
            {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': 'Saturday',
              'opens': '09:00',
              'closes': '16:00'
            }
          ],
          'sameAs': [
            'https://instagram.com/dentiscompany',
            'https://facebook.com/dentiscompany',
            'https://linkedin.com/company/dentiscompany'
          ]
        },
        {
          '@type': 'LocalBusiness',
          '@id': 'https://dentiscompany.example.com/#localbusiness',
          'name': 'Dentis Company',
          'parentOrganization': {
            '@type': 'Organization',
            'name': 'Dentis Company Group',
            'url': window.location.href
          },
          'image': 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=1200&h=630',
          'telephone': '(555) 123-4567',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '456 Healthcare Blvd, Suite 100',
            'addressLocality': 'Metropolis',
            'addressRegion': 'NY',
            'postalCode': '10001',
            'addressCountry': 'US'
          }
        }
      ]
    };

    schemaScript.textContent = JSON.stringify(schemaData, null, 2);

    return () => {
      // Keep cleanup optional, but keeping it ensures we don't leave stale scripts if unmounted
    };
  }, []);

  return null;
}
