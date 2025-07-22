import React from 'react';

interface LegendItem {
  color: string;
  description: string;
}

interface LegendProps {
  items: LegendItem[];
  title?: string;
}

const Legend: React.FC<LegendProps> = ({ items, title = "Legend" }) => {
  const legendStyles = {
    container: {
      backgroundColor: '#f3f3f38d',
      border: '1px solid #d9d7d7ff',
      borderRadius: '4px',
      padding: '16px',
      margin: '16px 0',
    },
    title: {
      fontSize: '1rem',
      fontWeight: 'bold' as const,
      margin: '0 0 12px 0',
      textAlign: 'center' as const
    },
    items: {
      display: 'flex',
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      justifyContent: 'center' as const,
      gap: '1.5rem',
      '@media (maxWidth: 768px)': {
        flexDirection: 'column' as const,
        gap: '0.75rem'
      }
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '.5rem',
      // flex: '1 1 auto',
      '@media (maxWidth: 768px)': {
        minWidth: 'auto',
        flex: '1 1 100%'
      }
    },
    colorBox: {
      width: '20px',
      height: '20px',
      borderRadius: '4px',
      // flexShrink: 0p
    },
    description: {
      color: '#1e1e1eff',
      fontSize: '14px',
      lineHeight: '1.4',
      // flex: 1,
      '@media (maxWidth: 480px)': {
        fontSize: '12px'
      }
    }
  };

  // Helper function to apply responsive styles
  const getResponsiveStyles = (baseStyles: any) => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    
    if (screenWidth <= 480) {
      return {
        ...baseStyles,
        ...baseStyles['@media (max-width: 480px)']
      };
    } else if (screenWidth <= 768) {
      return {
        ...baseStyles,
        ...baseStyles['@media (max-width: 768px)']
      };
    }
    
    return baseStyles;
  };

  return (
    <div style={getResponsiveStyles(legendStyles.container)}>
      <h3 style={getResponsiveStyles(legendStyles.title)}>{title}</h3>
      <div style={getResponsiveStyles(legendStyles.items)}>
        {items.map((item, index) => (
          <div key={index} style={getResponsiveStyles(legendStyles.item)}>
            <div 
              style={{
                ...getResponsiveStyles(legendStyles.colorBox),
                backgroundColor: item.color
              }}
            ></div>
            <span style={getResponsiveStyles(legendStyles.description)}>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
