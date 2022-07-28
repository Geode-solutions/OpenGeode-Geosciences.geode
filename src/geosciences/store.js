/*
 * Copyright (c) 2019 - 2022 Geode-solutions
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

export default {
  namespaced: true,
  state: {},
  actions: {
    loadStructuralModel({ state, dispatch }, filename) {
      dispatch("private/loadObject", {
        command: "opengeode.load.structuralmodel",
        filename,
      }).then((object) => {
        let brepStyle = {
          style: {
            corners: { visible: true, size: 1, color: [1, 1, 1] },
            lines: { visible: true, color: [1, 1, 1] },
            surfaces: {
              visible: true,
              color: [1, 1, 1],
              mesh: { visible: false },
            },
            blocks: {},
          },
        };
        dispatch("addObject", Object.assign(object, brepStyle), { root: true });
      });
    },
  },
  modules: {
    private: {
      namespaced: true,
      actions: {
        loadObject({ dispatch }, { command, filename }) {
          return dispatch(
            "network/call",
            {
              command,
              args: [filename],
            },
            { root: true }
          );
        },
      },
    },
  },
};
