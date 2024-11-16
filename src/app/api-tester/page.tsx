"use client"
import React, { useState } from 'react';
import styles from './ApiTester.module.css';
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const ApiTester: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [method, setMethod] = useState<Method>('GET');
  const [headers, setHeaders] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const parsedHeaders = headers
        ? JSON.parse(headers)
        : {};

      const options: RequestInit = {
        method,
        headers: parsedHeaders,
      };

      if (method !== 'GET' && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const resText = await res.text();

      setResponse(JSON.stringify(JSON.parse(resText), null, 2)); // Pretty format JSON
    } catch (err) {
      setResponse(`Error: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>API Tester</h1>

      <div>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API endpoint"
            id={styles.urlInput}
          />
        </label>
      </div>

      <div>
        <label>
          Method:
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as Method)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Headers (JSON):
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder='{"Content-Type": "application/json"}'
            rows={5}
            cols={60}
            id={styles.headersInput}
          />
        </label>
      </div>

      {method !== 'GET' && (
        <div>
          <label>
            Body (JSON):
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value"}'
              rows={5}
              id={styles.bodyInput}
              cols={60}
            />
          </label>
        </div>
      )}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Loading...' : 'Send Request'}
      </button>

      <div>
        <h2>Response:</h2>
        <pre>
        <code className="prettyprint">{response}</code>
        </pre>
      </div>
    </div>
  );
};

export default ApiTester;
