export interface IXyValues {
    xValues: number[];
    yValues: number[];
}

/**
 * Helper class for the SciChart.Js JavaScript Chart examples to return datasets used throughout the examples
 */
export class ExampleDataProvider {

    /**
     * Creates a damped sinewave
     * @param pad number of points to pad with zeros
     * @param amplitude The amplitude
     * @param phase An initial phase
     * @param dampingFactor Damping factor applied to the sinewave
     * @param pointCount Total number of points
     * @param freq The frequency of the sinewave in radians
     */
    public static getDampedSinewave(pad: number,
                                    amplitude: number,
                                    phase: number,
                                    dampingFactor: number,
                                    pointCount: number,
                                    frequency: number = 10): IXyValues {
        const xValues: number[] = [];
        const yValues: number[] = [];

        for (let i = 0; i < pad; i++) {
            const time = 10* i / pointCount;
            xValues.push(time);
            yValues.push(NaN);
        }

        for (let i = pad, j = 0; i < pointCount; i++, j++)
        {
            const time = 10 * i / pointCount;
            const wn = 2 * Math.PI / (pointCount / frequency);

            xValues.push(time);
            yValues.push(amplitude * Math.sin(j * wn + phase));

            amplitude *= (1.0 - dampingFactor);
        }

        return {xValues, yValues};
    }

    public static getSinewave(amplitude: number, phase: number, pointCount: number, frequency: number = 10): IXyValues {
        return ExampleDataProvider.getDampedSinewave(0, amplitude, phase, 0.0, pointCount, frequency);
    }

    public static getNoisySinewave(amplitude: number, phase: number, pointCount: number, noiseAmplitude: number)
        : IXyValues {

        const {xValues, yValues} = ExampleDataProvider.getSinewave(amplitude, phase, pointCount);

        // Add some noise
        for (let i = 0; i < pointCount; i++) {
            yValues[i] += Math.random() * noiseAmplitude - noiseAmplitude * 0.5;
        }

        return { xValues, yValues };
    }
}