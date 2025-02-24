import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {routeConfig} from './Routes'

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {Object.values(routeConfig).map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<div>Loading...</div>}>
                            <div>
                                {element}
                            </div>
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    </Suspense>
  )
}
