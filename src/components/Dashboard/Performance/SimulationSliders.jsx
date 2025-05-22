import React, { useEffect, useState } from "react";

const SimulationSliders = ({ parameters, setParameters }) => {
  const [animatedValues, setAnimatedValues] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues((prev) => {
        const updated = { ...prev };
        let hasChange = false;

        for (const key in parameters) { 
          const current = prev[key] ?? parameters[key];
          const target = parameters[key];

          if (current !== target) {
            hasChange = true;
            const step = (target - current) * 0.1;
            updated[key] = Math.abs(step) < 1 ? target : current + step;
          }
        }

        return hasChange ? updated : prev;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [parameters]);

  const handleChange = (key, value) => {
    setParameters((prev) => ({ ...prev, [key]: value }));
  };

  const sliders = [
    { label: "resource Allocation", key: "resourceAllocation" },
    { label: "process Efficiency", key: "processEfficiency" },
    { label: "staffing Levels", key: "staffingLevels" },
    { label: "technology Adoption", key: "technologyAdoption" },
    { label: "market Conditions", key: "marketConditions" },
  ];

  return (
    <div className="space-y-5">
      {sliders.map(({ label, key }) => {
        const actualValue = parameters[key];
        const animatedValue = animatedValues[key] ?? actualValue;
        const percentage = ((animatedValue + 100) / 200) * 100;

        return (
          <div key={key}>
            <div className="flex justify-between items-center mb-1 text-sm text-gray-700">
              <span className="capitalize">{label}</span>
              <span>{Math.round(animatedValue)}%</span>
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              step="5"
              value={actualValue}
              onChange={(e) => handleChange(key, parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all duration-200"
              style={{
                background: `linear-gradient(to right, #22c55e 0%, #22c55e ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
                accentColor: '#22c55e',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SimulationSliders;
