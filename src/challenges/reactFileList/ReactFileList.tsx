import { useState } from 'react';
import data from './data-nested.json';
import type { NestedFile } from './types';

interface NodeParam {
  node: NestedFile;
}

function Folder({ node }: NodeParam) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <li data-testid={'folder-item-' + node.fileName}>
      <button
        data-testid={'btn-' + node.fileName}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {node.fileName}
      </button>
      {isExpanded && (
        <ul data-testid={'nested-list-' + node.fileName}>
          {node.children?.map?.((child: NestedFile) => (
            <Node key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function File({ node }: NodeParam) {
  const color = node.fileName.endsWith('.server.tsx') ? 'yellow' : 'blue';
  return (
    <li data-testid={'file-name-' + node.fileName} style={{ color }}>
      {node.fileName}
    </li>
  );
}

function Node({ node }: NodeParam) {
  return node.children === null ? <File node={node} /> : <Folder node={node} />;
}

export default function ReactFileList() {
  return (
    <ul>
      <Node node={data} />
    </ul>
  );
}
