import React from 'react';
import parse, { domToReact } from 'html-react-parser';

const BlogContent = ({ content }) => {
  const cleanContent = (node) => {
    if (node.name === 'p' && node.children) {
      node.children = node.children.map((child) => {
        if (child.name === 'div') {
          child.name = 'span';
        }
        return child;
      });
    }

    if (node.children) {
      node.children = node.children.map(cleanContent);
    }

    return node;
  };

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.name) {
        const props = { ...domNode.attribs };

        if (props.style) {
          try {
            const styleObject = props.style.split(';').reduce((acc, style) => {
              const [key, value] = style.split(':');
              if (key && value) {
                const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                acc[camelKey] = value.trim();
              }
              return acc;
            }, {});

            props.style = styleObject;
          } catch (error) {
            console.error('Error parsing inline styles:', error);
          }
        }

        const cleanedNode = cleanContent(domNode);

        return React.createElement(
          cleanedNode.name,
          props,
          cleanedNode.children && cleanedNode.children.length > 0
            ? domToReact(cleanedNode.children, options)
            : null
        );
      }
    }
  };

  return (
    <div className="blog-content">
      {parse(content, options)}
    </div>
  );
};

export default BlogContent;
