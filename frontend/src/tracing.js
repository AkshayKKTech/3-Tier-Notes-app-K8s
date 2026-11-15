// src/tracing.js
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// Only initialize if a valid public endpoint exists, otherwise skip browser tracing
const OTEL_ENDPOINT = process.env.REACT_APP_OTEL_ENDPOINT;

if (OTEL_ENDPOINT) {
  const provider = new WebTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'react-frontend',
    }),
  });

  const exporter = new OTLPTraceExporter({
    url: OTEL_ENDPOINT,
  });

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();
} else {
  console.info('Browser-side OpenTelemetry tracing is disabled.');
}