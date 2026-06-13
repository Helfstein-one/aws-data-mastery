/**
 * draw.io / mxGraph Diagram Renderer
 * Renders .drawio-diagram <div> elements using the mxGraph library
 * with AWS 2026 stencil support
 */
(function () {
  'use strict';

  /* -----------------------------------------------------------------------
   * Configuration
   * --------------------------------------------------------------------- */
  var CDN_BASE = 'https://cdn.jsdelivr.net/npm/mxgraph@4.2.2/javascript/';
  var AWS_STENCIL_URL = 'https://raw.githubusercontent.com/jgraph/drawio/master/src/main/webapp/stencils/aws4.xml';

  /* -----------------------------------------------------------------------
   * Helper: load a script dynamically
   * --------------------------------------------------------------------- */
  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    s.onerror = function () { console.error('[drawio-renderer] Failed to load:', src); };
    document.head.appendChild(s);
  }

  /* -----------------------------------------------------------------------
   * AWS Icon shape registry (subset of AWS 2026 / aws4 stencil pack)
   * These map friendly names → mxGraph shape IDs
   * --------------------------------------------------------------------- */
  window.AWS_SHAPES = {
    // Storage
    's3':              'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.s3',
    'glue':            'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.glue',
    'lakeformation':   'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lake_formation',
    // Streaming
    'kinesis':         'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kinesis_data_streams',
    'firehose':        'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kinesis_data_firehose',
    'msk':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.managed_streaming_for_kafka',
    // Compute
    'lambda':          'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lambda',
    'ecs':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.ecs',
    'eks':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.eks',
    'ec2':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.ec2',
    'emr':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.emr',
    'fargate':         'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.fargate',
    // Databases
    'aurora':          'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.aurora',
    'rds':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.rds',
    'dynamodb':        'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.dynamodb',
    'redshift':        'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.redshift',
    'elasticache':     'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elasticache',
    // Analytics
    'athena':          'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.athena',
    'quicksight':      'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.quicksight',
    // Messaging
    'sns':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sns',
    'sqs':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sqs',
    'eventbridge':     'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.eventbridge',
    // Orchestration
    'stepfunctions':   'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.step_functions',
    'mwaa':            'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.managed_workflows_for_apache_airflow',
    // Networking & Security
    'apigw':           'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.api_gateway',
    'cloudfront':      'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudfront',
    'vpc':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.vpc',
    'iam':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.role',
    'kms':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.key_management_service',
    'secretsmanager':  'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.secrets_manager',
    'cloudwatch':      'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudwatch',
    // AI/ML
    'bedrock':         'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.bedrock',
    'sagemaker':       'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sagemaker',
    // Migration
    'dms':             'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.database_migration_service',
  };

  /* -----------------------------------------------------------------------
   * Render a single diagram container
   * --------------------------------------------------------------------- */
  function renderDiagram(container) {
    var xml = container.getAttribute('data-xml') || container.querySelector('script[type="application/drawio"]');
    if (!xml && typeof xml !== 'string') {
      var scriptEl = container.querySelector('script[type="application/drawio"]');
      if (scriptEl) xml = scriptEl.textContent;
    }
    if (!xml) return;

    try {
      var doc = mxUtils.parseXml(xml);
      var codec = new mxCodec(doc);
      var graph = new mxGraph(container);

      // Dark theme styling
      graph.getStylesheet().getDefaultVertexStyle()[mxConstants.STYLE_FILLCOLOR] = '#1e293b';
      graph.getStylesheet().getDefaultVertexStyle()[mxConstants.STYLE_STROKECOLOR] = '#475569';
      graph.getStylesheet().getDefaultVertexStyle()[mxConstants.STYLE_FONTCOLOR] = '#e2e8f0';
      graph.getStylesheet().getDefaultVertexStyle()[mxConstants.STYLE_FONTSIZE] = 11;
      graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_STROKECOLOR] = '#64748b';
      graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_FONTCOLOR] = '#94a3b8';

      graph.setEnabled(false); // read-only
      graph.setTooltips(true);
      graph.setPanning(false);

      codec.decode(doc.documentElement, graph.getModel());

      // Fit diagram to container
      graph.fit();
      graph.center();
    } catch (e) {
      console.error('[drawio-renderer] Error rendering diagram:', e);
    }
  }

  /* -----------------------------------------------------------------------
   * Main init — called after mxGraph loads
   * --------------------------------------------------------------------- */
  function init() {
    if (typeof mxGraph === 'undefined') {
      console.warn('[drawio-renderer] mxGraph not loaded');
      return;
    }

    // Disable default mxGraph URL (we use CDN)
    window.mxLoadResources = false;
    window.mxResourceExtension = '.txt';

    var diagrams = document.querySelectorAll('.drawio-diagram');
    if (diagrams.length === 0) return;

    diagrams.forEach(function (el) {
      renderDiagram(el);
    });
  }

  /* -----------------------------------------------------------------------
   * Bootstrap
   * --------------------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (typeof mxGraph !== 'undefined') {
        init();
      } else {
        loadScript(CDN_BASE + 'mxClient.js', init);
      }
    });
  } else {
    if (typeof mxGraph !== 'undefined') {
      init();
    } else {
      loadScript(CDN_BASE + 'mxClient.js', init);
    }
  }
})();
