(function (React, ReactDOM) {
  'use strict';

  const h = React.createElement;

  const SERVICES = [
    {
      number: '01',
      title: 'Custom Website Development',
      description: 'Fast, responsive, and conversion-focused websites built with clean code and thoughtful user experiences.',
      icon: 'browser',
      featured: true
    },
    {
      number: '02',
      title: 'AI Chatbot Solutions',
      description: 'Intelligent assistants that answer questions, qualify leads, and support customers around the clock.',
      icon: 'chatbot'
    },
    {
      number: '03',
      title: 'WhatsApp Automation',
      description: 'Automated messaging, follow-ups, and booking flows that keep customer conversations moving.',
      icon: 'whatsapp'
    },
    {
      number: '04',
      title: 'Workflow Automation',
      description: 'Connected processes that remove repetitive work and give your team more time for high-value tasks.',
      icon: 'workflow'
    },
    {
      number: '05',
      title: 'SaaS Platform Integration',
      description: 'Reliable integrations that bring your tools, data, and customer experiences into one scalable system.',
      icon: 'integration'
    }
  ];

  function ServiceIcon({ type }) {
    const common = {
      viewBox: '0 0 64 64',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': true
    };

    const icons = {
      browser: h(React.Fragment, null,
        h('rect', { x: 8, y: 11, width: 48, height: 40, rx: 5 }),
        h('path', { d: 'M8 21h48M15 16h.1M21 16h.1M27 16h.1' }),
        h('path', { d: 'm16 41 10-10 8 7 8-9 7 7' })
      ),
      chatbot: h(React.Fragment, null,
        h('path', { d: 'M13 14h38a5 5 0 0 1 5 5v22a5 5 0 0 1-5 5H29L18 54v-8h-5a5 5 0 0 1-5-5V19a5 5 0 0 1 5-5Z' }),
        h('circle', { cx: 22, cy: 30, r: 2 }),
        h('circle', { cx: 32, cy: 30, r: 2 }),
        h('circle', { cx: 42, cy: 30, r: 2 })
      ),
      whatsapp: h(React.Fragment, null,
        h('path', { d: 'M32 9a22 22 0 0 0-19 33L9 55l13-4A22 22 0 1 0 32 9Z' }),
        h('path', { d: 'M25 22c1-2 3-2 4 0l2 4c.5 1 0 2-1 3l-2 2c3 5 6 8 11 10l2-3c1-1 2-1 3-.5l4 2c2 1 2 3 1 5-2 3-5 5-9 4-10-2-21-13-23-23-1-4 1-7 4-9' })
      ),
      workflow: h(React.Fragment, null,
        h('rect', { x: 7, y: 11, width: 17, height: 13, rx: 3 }),
        h('rect', { x: 40, y: 40, width: 17, height: 13, rx: 3 }),
        h('circle', { cx: 32, cy: 32, r: 9 }),
        h('path', { d: 'M24 17h8v6M40 47h-8v-6M32 27v10M27 32h10' })
      ),
      integration: h(React.Fragment, null,
        h('path', { d: 'M25 12h14v10a7 7 0 1 1 0 14v16H25V42a7 7 0 1 0 0-14V12Z' }),
        h('path', { d: 'M25 18H11v12h7a7 7 0 0 1 0 14h-7v8h14M39 18h14v12h-7a7 7 0 0 0 0 14h7v8H39' })
      )
    };

    return h('svg', common, icons[type]);
  }

  const ServiceCard = React.memo(function ServiceCard({ service, index }) {
    return h('article', {
      className: `service-panel${service.featured ? ' service-panel--featured' : ''}`,
      style: { '--reveal-delay': `${index * 80}ms` }
    },
      h('div', { className: 'service-panel__visual' },
        h('div', { className: 'service-panel__icon' }, h(ServiceIcon, { type: service.icon })),
        h('span', { className: 'service-panel__orbit', 'aria-hidden': true })
      ),
      h('div', { className: 'service-panel__copy' },
        h('span', { className: 'service-panel__number' }, `${service.number}.`),
        h('h3', null, service.title),
        h('span', { className: 'service-panel__rule', 'aria-hidden': true }),
        h('p', null, service.description)
      )
    );
  });

  function NetworkBackdrop() {
    return h('svg', {
      className: 'services-network',
      viewBox: '0 0 1200 900',
      preserveAspectRatio: 'xMidYMid slice',
      'aria-hidden': true
    },
      h('g', { className: 'services-network__lines' },
        h('path', { d: 'M-20 150 130 85l110 78 128-51 97 120' }),
        h('path', { d: 'm130 85 22 156 88-78 64 145' }),
        h('path', { d: 'm865 75 95 66 118-44 150 115' }),
        h('path', { d: 'm960 141 42 155 76-199 45 161' }),
        h('path', { d: 'M-20 730 120 650l112 91 112-46 95 142' }),
        h('path', { d: 'm120 650 28 172 84-81 73 145' })
      ),
      h('g', { className: 'services-network__dots' },
        [
          [130,85],[240,163],[368,112],[152,241],[865,75],[960,141],[1078,97],
          [1002,296],[1123,258],[120,650],[232,741],[344,695],[148,822]
        ].map((point, index) => h('circle', { key: index, cx: point[0], cy: point[1], r: index % 3 === 0 ? 5 : 3 }))
      )
    );
  }

  function ServicesSection() {
    const sectionRef = React.useRef(null);

    React.useEffect(function initServicesMotion() {
      const section = sectionRef.current;
      if (!section) return undefined;

      const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14 });

      section.querySelectorAll('.services-heading, .service-panel').forEach(function (element) {
        revealObserver.observe(element);
      });

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const handlePointerMove = function (event) {
        if (reduceMotion) return;
        const rect = section.getBoundingClientRect();
        section.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width - 0.5) * 16}px`);
        section.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height - 0.5) * 16}px`);
      };

      section.addEventListener('pointermove', handlePointerMove, { passive: true });
      return function cleanup() {
        revealObserver.disconnect();
        section.removeEventListener('pointermove', handlePointerMove);
      };
    }, []);

    return h('section', { className: 'services-section', id: 'services', ref: sectionRef },
      h(NetworkBackdrop),
      h('div', { className: 'services-dots services-dots--one', 'aria-hidden': true }),
      h('div', { className: 'services-dots services-dots--two', 'aria-hidden': true }),
      h('div', { className: 'services-shell' },
        h('div', { className: 'services-heading' },
          h('h2', null, 'Services'),
          h('p', null, 'What I can build for your next idea', h('span', null, '.'))
        ),
        h('div', { className: 'services-layout' },
          SERVICES.map(function (service, index) {
            return h(ServiceCard, { key: service.title, service, index });
          })
        )
      )
    );
  }

  const mountNode = document.getElementById('services-root');
  if (mountNode) {
    ReactDOM.createRoot(mountNode).render(h(ServicesSection));
  }
})(window.React, window.ReactDOM);
