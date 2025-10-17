import React from 'react';

const WzzmIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        viewBox="0 0 21 21" 
        fill="currentColor" 
        height="1em" 
        width="1em" 
        {...props}
    >
        <path d="M1 1h9v9H1zM11 1h9v9h-9zM1 11h9v9H1zM11 11h9v9h-9z" />
    </svg>
);

export default WzzmIcon;
